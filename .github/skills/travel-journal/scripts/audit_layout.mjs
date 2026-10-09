// Pass this self-contained function to Playwright page.evaluate/frame.evaluate.
export async function auditLayout({ selection, locale, imageAssets = [], selector = "[data-trip-style]" }) {
  const errors = [];
  const root = document.querySelector(selector);
  if (!root) return { errors: ["Trip presentation root not found"], measurements: [] };
  const ownerDocument = root.ownerDocument;
  const view = ownerDocument.defaultView;
  const content = root.querySelector("[data-trip-document]");
  if (!view || !content) return { errors: ["Rendered trip document/window not found"], measurements: [] };
  const expectedLang = locale === "zh" ? "zh-CN" : "en";
  if (root.lang !== expectedLang) errors.push(`Expected presentation lang=${expectedLang}`);
  const galleries = [...content.querySelectorAll(".pgrid")];
  const rows = selection.selectionRows;
  const byId = new Map(imageAssets.map((asset) => [asset.id, asset]));
  const measurements = [];
  const rect = (element) => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  };
  const center = (box) => box.x + box.width / 2;
  if (galleries.length !== rows.length) errors.push("Rendered gallery count differs from approved rows");
  // Trigger lazy images without scrolling away from the geometry being measured.
  await Promise.all(galleries.flatMap((gallery) => [...gallery.querySelectorAll("img")]).map(async (image) => {
    const previousLoading = image.loading;
    image.loading = "eager";
    let timer;
    try {
      if (image.decode) {
        await Promise.race([
          image.decode(),
          new Promise((resolve, reject) => {
            timer = view.setTimeout(() => reject(new Error("image decode timed out")), 15000);
          }),
        ]);
      }
    } catch {
      errors.push(`Image failed to decode/load: ${image.currentSrc || image.src}`);
    } finally {
      if (timer !== undefined) view.clearTimeout(timer);
      image.loading = previousLoading;
    }
  }));
  if (ownerDocument.documentElement.scrollWidth > view.innerWidth + 2) errors.push("Horizontal overflow");

  for (let index = 0; index < galleries.length; index++) {
    const gallery = galleries[index];
    const row = rows[index];
    if (!row) continue;
    const images = [...gallery.querySelectorAll("img")];
    const card = gallery.closest(".card");
    const wrap = gallery.closest("[data-trip-section]");
    const box = rect(gallery);
    const label = row.id;
    if (wrap?.getAttribute("data-trip-section") !== row.sectionId) errors.push(`${label}: wrong rendered section`);
    if (images.length !== row.photoIds.length) errors.push(`${label}: wrong rendered image count`);
    if (box.width > 960 + 2) errors.push(`${label}: gallery exceeds 960px`);
    if (row.layout === "one" && box.width > 420 + 2) errors.push(`${label}: natural single exceeds 420px`);
    if (card && Math.abs(center(box) - center(rect(card))) > 2) errors.push(`${label}: gallery is off the reading axis`);
    const frames = [];
    for (let cell = 0; cell < images.length; cell++) {
      const image = images[cell];
      const frame = rect(image);
      frames.push(frame);
      if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
        errors.push(`${label}: image ${cell + 1} is not fully loaded`);
        continue;
      }
      if (frame.width <= 0 || frame.height <= 0) errors.push(`${label}: hidden or zero-size essential image`);
      const photoId = row.photoIds[cell];
      const asset = byId.get(photoId);
      const filename = decodeURIComponent(new URL(image.currentSrc || image.src, ownerDocument.baseURI).pathname.split("/").pop());
      if (![asset?.filename ?? `${photoId}.webp`, asset?.thumbnailFilename].includes(filename)) {
        errors.push(`${label}: image ${cell + 1} does not match approved ID ${photoId}`);
      }
      const fit = view.getComputedStyle(image).objectFit;
      const sourceRatio = image.naturalWidth / image.naturalHeight;
      const frameRatio = frame.width / frame.height;
      if (row.treatment === "contain" && !["contain", "scale-down"].includes(fit)
          && Math.abs(frameRatio / sourceRatio - 1) > 0.02) {
        errors.push(`${label}: image ${cell + 1} is cropped/stretched despite contain treatment`);
      }
      if (row.layout === "one" && Math.abs(frameRatio / sourceRatio - 1) > 0.02) {
        errors.push(`${label}: single image lost its natural ratio`);
      }
      if (imageAssets.length && asset?.thumbnailFilename && image.getAttribute("data-full-src")?.endsWith(asset.filename) !== true) {
        errors.push(`${label}: thumbnail lacks its complete-image lightbox source`);
      }
    }
    const visualRows = [];
    for (const frame of frames) {
      let peers = visualRows.find((group) => Math.abs(group[0].y - frame.y) <= 2);
      if (!peers) {
        peers = [];
        visualRows.push(peers);
      }
      peers.push(frame);
    }
    const frameGroups = row.shape ? [frames] : visualRows;
    for (const peers of frameGroups) {
      if (peers.length > 1 && (Math.max(...peers.map((item) => item.width)) - Math.min(...peers.map((item) => item.width)) > 2
          || Math.max(...peers.map((item) => item.height)) - Math.min(...peers.map((item) => item.height)) > 2)) {
        errors.push(`${label}: rendered peer frames differ by more than 2px`);
      }
    }
    if (row.layout === "three" && view.innerWidth <= 760) {
      if (visualRows.some((group) => group.length !== 1)) {
        errors.push(`${label}: three-image groups must stack on phones`);
      } else if (frames.some((frame, index) => index > 0 && frame.y <= frames[index - 1].y)) {
        errors.push(`${label}: phone stack does not preserve source order`);
      }
    }
    if (visualRows.length > 1 && visualRows.some((group) => group.length !== visualRows[0].length)) {
      errors.push(`${label}: orphan image cell in rendered grid`);
    }
    measurements.push({ rowId: label, gallery: box, frames, columnsPerRow: visualRows.map((group) => group.length) });
  }
  for (const prose of content.querySelectorAll(".jtxt, .hw, .hwcn")) {
    const box = rect(prose);
    if (box.width > (locale === "zh" ? 612 : 640) + 2) errors.push("Prose exceeds localized reading width");
    const card = prose.closest(".card");
    if (card && Math.abs(center(box) - center(rect(card))) > 2) errors.push("Prose is off the shared reading axis");
  }
  return { errors, locale, viewportWidth: view.innerWidth, measurements };
}
