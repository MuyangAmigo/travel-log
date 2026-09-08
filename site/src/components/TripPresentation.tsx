"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { TripStyle } from "@/lib/trip-style";
import TripEntryLayout, { type TripEntrySection } from "./TripEntryLayout";
import CardScaleController from "./CardScaleController";
import ImageLightbox from "./ImageLightbox";
import styles from "./TripPresentation.module.css";

export default function TripPresentation({
  style,
  locale,
  coverImage,
  sections,
  children,
}: {
  style: TripStyle;
  locale: "zh" | "en";
  coverImage: string;
  sections?: readonly TripEntrySection[];
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previousStyle = useRef(style);

  useLayoutEffect(() => {
    if (previousStyle.current === style) return;
    previousStyle.current = style;
    const root = rootRef.current;
    const href = root?.querySelector<HTMLAnchorElement>('.trip-entry-nav a[aria-current="location"]')?.getAttribute("href");
    if (root && href?.startsWith("#")) {
      root.ownerDocument.getElementById(href.slice(1))?.scrollIntoView({ block: "start" });
    }
  }, [style]);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = root?.ownerDocument.defaultView;
    if (!root || !viewport) return;
    const header = root.ownerDocument.querySelector<HTMLElement>(".site-header");
    const sync = () => {
      root.style.setProperty("--trip-sticky-top", `${(header?.offsetHeight ?? 0) + 16}px`);
    };
    const observer = new viewport.ResizeObserver(sync);
    if (header) observer.observe(header);
    sync();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.presentation}
      data-trip-style={style}
      style={{ "--trip-cover-image": `url(${JSON.stringify(coverImage)})` } as CSSProperties}
    >
      <div className="trip-content">
        <TripEntryLayout locale={locale} sections={sections}>
          <CardScaleController rootRef={rootRef} contentKey={children} />
          {children}
        </TripEntryLayout>
      </div>
      <ImageLightbox locale={locale} rootRef={rootRef} contentKey={children} />
    </div>
  );
}
