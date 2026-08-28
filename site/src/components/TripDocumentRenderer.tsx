import { Fragment, type CSSProperties, type ReactNode } from "react";
import {
  deriveTripEntrySections,
  localize,
  type BlockSpacing,
  type ContentWidth,
  type GalleryBlock,
  type LocalizedText,
  type TripBlock,
  type TripDocument,
  type TripDocumentLocale,
} from "@/lib/trip-document";

type TripDocumentRendererProps = {
  document: TripDocument;
  locale: TripDocumentLocale;
  imageUrl: (filename: string) => string;
};

const SPACING_CLASS = {
  top: {
    8: "mt8",
    12: "mt12",
    16: "mt16",
    20: "mt20",
    24: "mt24",
  },
  bottom: {
    8: "mb8",
    12: "mb12",
    16: "mb16",
    20: "mb20",
  },
} as const;

const GALLERY_LAYOUT_CLASS: Record<GalleryBlock["layout"], string> = {
  one: "g1",
  two: "g2",
  three: "g3",
  four: "g4",
  "weighted-left": "g12",
  "weighted-right": "g21",
};

const IMAGE_SHAPE_CLASS = {
  square: "sq",
  landscape: "ls",
  wide: "wd",
  portrait: "pt",
  hero: "hero",
} as const;

const IMAGE_TONE_CLASS = {
  normal: "",
  warm: "fw",
  cool: "fc",
  soft: "fs",
  golden: "fg",
  vivid: "fv",
  crisp: "fn",
} as const;

const IMAGE_TILT_CLASS = {
  none: "",
  left: "tl-tilt",
  right: "tr-tilt",
} as const;

const IMAGE_FOCUS_STYLE = {
  center: undefined,
  upper: { objectPosition: "center 20%" },
} satisfies Record<NonNullable<GalleryBlock["images"][number]["focus"]>, CSSProperties | undefined>;

const TAG_CLASS = {
  gold: "tag-g",
  coral: "tag-c",
  teal: "tag-t",
  blue: "tag-b",
  pink: "tag-p",
  red: "tag-c",
  yellow: "tag-g",
  green: "tag-t",
} as const;

const COLORED_TAG_CLASS = {
  gold: "tag-gold",
  coral: "tag-red",
  teal: "tag-green",
  blue: "tag-blue",
  pink: "tag-pink",
  red: "tag-red",
  yellow: "tag-yellow",
  green: "tag-green",
} as const;

const COVER_INTRO_WIDTH: Record<ContentWidth, number | undefined> = {
  narrow: 460,
  medium: 500,
  full: undefined,
};

const PROSE_WIDTH: Record<ContentWidth, number | undefined> = {
  narrow: 560,
  medium: 600,
  full: undefined,
};

function classes(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function spacingClasses(spacing?: BlockSpacing): string {
  if (!spacing) return "";
  return classes(
    spacing.top ? SPACING_CLASS.top[spacing.top] : "",
    spacing.bottom ? SPACING_CLASS.bottom[spacing.bottom] : ""
  );
}

function text(value: LocalizedText, locale: TripDocumentLocale): string {
  return localize(value, locale);
}

function withLineBreaks(value: string): ReactNode {
  return value.split("\n").map((part, index) => (
    <Fragment key={`${index}-${part}`}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function getImage(document: TripDocument, imageId: string) {
  const image = document.images.find((candidate) => candidate.id === imageId);
  if (!image) {
    throw new Error(`Validated trip document references missing image "${imageId}"`);
  }
  return image;
}

function renderBlock(
  block: TripBlock,
  document: TripDocument,
  locale: TripDocumentLocale,
  imageUrl: (filename: string) => string
) {
  const spacing = spacingClasses(block.spacing);

  switch (block.type) {
    case "cover": {
      const background = block.backgroundImageId
        ? getImage(document, block.backgroundImageId)
        : null;
      const introStyle: CSSProperties | undefined =
        block.introStyle === "quote"
          ? {
              fontFamily: "var(--font-serif-cn)",
              fontSize: 17,
              color: "var(--ink-light)",
              fontStyle: "italic",
              lineHeight: 2.2,
              maxWidth: block.introWidth
                ? COVER_INTRO_WIDTH[block.introWidth[locale]]
                : 500,
              textAlign: "center",
              marginTop: 10,
            }
          : undefined;
      return (
        <Fragment key={block.id}>
          {background && (
            <img
              className="trip-cover-image"
              src={imageUrl(background.filename)}
              alt=""
              aria-hidden="true"
            />
          )}
          {block.stamp?.variant === "circle" && (
            <div
              className="stamp-circle"
              style={{ position: "absolute", top: 30, right: 30 }}
            >
              <div>{withLineBreaks(text(block.stamp.text, locale))}</div>
            </div>
          )}
          <div className={classes("cover-border", spacing)}>
            <div className="cover-emoji">{text(block.eyebrow, locale)}</div>
            <h1 className="cover-title">{withLineBreaks(text(block.title, locale))}</h1>
            <div className="cover-subtitle">{text(block.subtitle, locale)}</div>
            {block.separators && <div className="cover-line" />}
            <div className="cover-date">{text(block.date, locale)}</div>
            {block.separators && <div className="cover-line" />}
            <p style={introStyle}>{withLineBreaks(text(block.intro, locale))}</p>
            {block.stamp?.variant === "box" && (
              <div className="mt20">
                <span className="stamp-box">{withLineBreaks(text(block.stamp.text, locale))}</span>
              </div>
            )}
            {block.boxStamp && (
              <div
                className={block.boxStampSpacing === "relaxed" ? undefined : "mt20"}
                style={block.boxStampSpacing === "relaxed" ? { marginTop: 35 } : undefined}
              >
                <span className="stamp-box">{withLineBreaks(text(block.boxStamp, locale))}</span>
              </div>
            )}
          </div>
        </Fragment>
      );
    }
    case "header":
      const markerStyle: CSSProperties | undefined =
        block.markerTone === "coral"
          ? { background: "var(--accent-coral)" }
          : undefined;
      return (
        <div key={block.id} className={classes("day-header", spacing)}>
          <div className="day-circle" style={markerStyle}>
            {block.markerVariant === "category" ? (
              <>
                <span style={{ fontSize: 24 }}>{text(block.markerLabel, locale)}</span>
                <span style={{ fontSize: 13 }}>{text(block.markerValue, locale)}</span>
              </>
            ) : (
              <>
                <span className="lbl">{text(block.markerLabel, locale)}</span>
                <span className="num">{text(block.markerValue, locale)}</span>
              </>
            )}
          </div>
          <div>
            <div className="day-title">{text(block.title, locale)}</div>
            <div className="day-sub">{text(block.subtitle, locale)}</div>
          </div>
          {block.icon && <div className="day-weather">{block.icon}</div>}
        </div>
      );
    case "prose": {
      const proseClass =
        block.style === "handwritten"
          ? "hw"
          : block.style === "handwritten-cn"
            ? "hwcn"
            : "jtxt";
      const proseWidth = block.width ? PROSE_WIDTH[block.width[locale]] : undefined;
      return (
        <div
          key={block.id}
          className={classes(proseClass, block.align === "center" && "tcenter", spacing)}
          style={
            proseWidth
              ? { maxWidth: proseWidth, marginLeft: "auto", marginRight: "auto" }
              : undefined
          }
        >
          {block.paragraphs.map((paragraph, index) => (
            <p key={index}>{withLineBreaks(text(paragraph, locale))}</p>
          ))}
        </div>
      );
    }
    case "gallery": {
      const galleryStyle: CSSProperties | undefined =
        block.width === "narrow"
          ? { maxWidth: 600, marginLeft: "auto", marginRight: "auto" }
          : block.width === "medium"
            ? { maxWidth: 620, marginLeft: "auto", marginRight: "auto" }
            : undefined;
      return (
        <div
          key={block.id}
          className={classes("pgrid", GALLERY_LAYOUT_CLASS[block.layout], spacing)}
          style={galleryStyle}
        >
          {block.images.map((item) => {
            const image = getImage(document, item.imageId);
            const isPolaroid = block.variant === "polaroid";
            return (
              <div
                key={item.imageId}
                className={classes(
                  isPolaroid ? "pol" : "pf",
                  IMAGE_TONE_CLASS[item.tone ?? "normal"],
                  IMAGE_TILT_CLASS[item.tilt ?? "none"]
                )}
              >
                <img
                  src={imageUrl(image.filename)}
                  alt={text(item.alt ?? image.alt, locale)}
                  className={item.shape ? IMAGE_SHAPE_CLASS[item.shape] : undefined}
                  style={item.focus ? IMAGE_FOCUS_STYLE[item.focus] : undefined}
                  loading="lazy"
                  decoding="async"
                />
                {item.caption && (
                  <div className={isPolaroid ? "pol-t" : "cap"}>
                    {withLineBreaks(text(item.caption, locale))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    case "timeline":
      return (
        <div key={block.id} className={classes("tlwrap", spacing)}>
          {block.items.map((item) => (
            <div key={item.id} className="tl-item">
              <span className="tm">{text(item.time, locale)}</span>
              <div className="ev">{text(item.event, locale)}</div>
              <div className="dt">{text(item.detail, locale)}</div>
            </div>
          ))}
        </div>
      );
    case "route": {
      const routeStyle: CSSProperties | undefined = block.compact
        ? { flexWrap: "wrap", gap: 4 }
        : undefined;
      return (
        <div key={block.id} className={classes("route", spacing)} style={routeStyle}>
          {block.stops.map((stop, index) => (
            <Fragment key={stop.id}>
              {index > 0 && <div className="ra">→</div>}
              <div className="rs">
                <div className="ic">{stop.icon}</div>
                <div className="lb">{withLineBreaks(text(stop.label, locale))}</div>
              </div>
            </Fragment>
          ))}
        </div>
      );
    }
    case "divider":
      return (
        <div key={block.id} className={classes("dv", spacing)}>
          <span>{block.icon}</span>
        </div>
      );
    case "note":
      return block.variant === "warning" ? (
        <div key={block.id} className={classes("rbox", "warn", spacing)}>
          <h4>{text(block.title, locale)}</h4>
          <p>{withLineBreaks(text(block.body, locale))}</p>
        </div>
      ) : (
        <div key={block.id} className={classes("nbox", spacing)}>
          <div className="nbox-lbl">{text(block.title, locale)}</div>
          <p>{withLineBreaks(text(block.body, locale))}</p>
        </div>
      );
    case "highlight":
      return (
        <div
          key={block.id}
          className={classes("rbox", block.tone === "warning" && "warn", spacing)}
        >
          <h4>{text(block.title, locale)}</h4>
          <p>{withLineBreaks(text(block.body, locale))}</p>
        </div>
      );
    case "rating":
      return (
        <div
          key={block.id}
          className={classes("rbox", block.tone === "warning" && "warn", spacing)}
        >
          <h4>{text(block.title, locale)}</h4>
          {block.items.map((item) => (
            <div key={item.id} className="ri">
              <span className="nm">{text(item.name, locale)}</span>
              {item.score !== undefined && item.score > 0 && (
                <span className="st" aria-label={`${item.score} / 5`}>
                  {(block.starStyle === "emoji" ? "⭐" : "★").repeat(item.score)}
                </span>
              )}
              <span className="cm">{text(item.comment, locale)}</span>
            </div>
          ))}
        </div>
      );
    case "shopping":
      return (
        <div key={block.id} className={classes("sgrid", spacing)}>
          {block.products.map((product) => {
            const image = product.imageId ? getImage(document, product.imageId) : null;
            return (
              <div key={product.id} className="sc">
                {image && (
                  <img
                    src={imageUrl(image.filename)}
                    alt={text(image.alt, locale)}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="sc-info">
                  <h5>{text(product.name, locale)}</h5>
                  {block.pricePosition !== "after-detail" && (
                    <div className="pr">{text(product.price, locale)}</div>
                  )}
                  {product.detail && (
                    <div className="ds">{text(product.detail, locale)}</div>
                  )}
                  {block.pricePosition === "after-detail" && (
                    <div className="pr">{text(product.price, locale)}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    case "expense":
      return (
        <div key={block.id} className={classes("bill", spacing)}>
          {block.title && <h4>{text(block.title, locale)}</h4>}
          {block.rows.map((row) => (
            <div key={row.id} className={classes("br", row.total && "total")}>
              <span>{text(row.label, locale)}</span>
              <span>{row.detail ? text(row.detail, locale) : ""}</span>
              <strong>{text(row.amount, locale)}</strong>
            </div>
          ))}
        </div>
      );
    case "tags":
      return (
        <div key={block.id} className={classes("tags", spacing)}>
          {block.items.map((item) => (
            <span
              key={item.id}
              className={
                block.variant === "colored"
                  ? COLORED_TAG_CLASS[item.tone]
                  : classes("tag", TAG_CLASS[item.tone])
              }
            >
              {text(item.label, locale)}
            </span>
          ))}
        </div>
      );
    case "ending":
      return (
        <div key={block.id} className={classes("tcenter", spacing)}>
          {block.flag && <div className="ending-flag">{block.flag}</div>}
          <div className="ending-title">{text(block.title, locale)}</div>
          <div className="ending-subtitle">{text(block.subtitle, locale)}</div>
          {block.stamp && <span className="stamp-box">{text(block.stamp, locale)}</span>}
        </div>
      );
    case "stamp":
      return (
        <div key={block.id} className={classes("tcenter", spacing)}>
          <span
            className="stamp-box"
            style={block.tilt === "none" ? { transform: "rotate(0)" } : undefined}
          >
            {text(block.text, locale)}
          </span>
        </div>
      );
    case "spacer":
      return <div key={block.id} className={classes("spacer", spacing)} />;
    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export default function TripDocumentRenderer({
  document,
  locale,
  imageUrl,
}: TripDocumentRendererProps) {
  const firstPageBySection = new Map<string, string>();
  for (const page of document.pages) {
    if (!firstPageBySection.has(page.sectionId)) {
      firstPageBySection.set(page.sectionId, page.id);
    }
  }

  return (
    <div className="structured-trip" style={{ display: "contents" }}>
      {document.pages.map((page, pageIndex) => {
        const isSectionStart = firstPageBySection.get(page.sectionId) === page.id;
        return (
          <div
            key={page.id}
            className="card-wrap"
            id={isSectionStart ? page.sectionId : undefined}
            data-trip-page={page.id}
            data-trip-section={page.sectionId}
          >
            <div
              className="card"
              style={
                page.cardVariant === "inset-cover"
                  ? { padding: "50px 55px" }
                  : undefined
              }
            >
              {page.blocks.map((block) => renderBlock(block, document, locale, imageUrl))}
              <div className="page-num">
                - {String(pageIndex + 1).padStart(2, "0")} -
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function createTripLocale(
  document: TripDocument,
  locale: TripDocumentLocale,
  imageUrl: (filename: string) => string
) {
  function StructuredTripLocale() {
    return <TripDocumentRenderer document={document} locale={locale} imageUrl={imageUrl} />;
  }

  return {
    Content: StructuredTripLocale,
    sections: deriveTripEntrySections(document, locale),
  };
}
