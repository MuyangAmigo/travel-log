type LocalImageOptions = {
  mode?: string;
  slug?: string;
  origin?: string;
};

export function localTripImage(
  slug: string,
  filename: string,
  options?: LocalImageOptions
): string | undefined {
  const configured = options ?? (process.env.NODE_ENV === "development" ? {
    mode: "development",
    slug: process.env.NEXT_PUBLIC_LOCAL_TRIP_SLUG,
    origin: process.env.NEXT_PUBLIC_LOCAL_TRIP_IMAGE_ORIGIN,
  } : {});
  if (configured.mode !== "development" || configured.slug !== slug || !configured.origin) {
    return undefined;
  }
  const origin = new URL(configured.origin);
  if (
    origin.protocol !== "http:" ||
    origin.hostname !== "127.0.0.1" ||
    origin.username || origin.password ||
    origin.pathname !== "/" || origin.search || origin.hash
  ) {
    throw new Error("Local trip images require a plain http://127.0.0.1:<port> origin.");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !/^[a-z0-9-]+\.webp$/.test(filename)) {
    throw new Error("Invalid local trip image path.");
  }
  return `${origin.origin}/${slug}/${filename}`;
}
