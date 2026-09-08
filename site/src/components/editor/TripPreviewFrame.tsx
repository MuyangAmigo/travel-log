"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TripDocumentRenderer from "@/components/TripDocumentRenderer";
import TripPresentation from "@/components/TripPresentation";
import {
  deriveTripEntrySections,
  type TripDocument,
  type TripDocumentLocale,
} from "@/lib/trip-document";
import { resolveTripStyle } from "@/lib/trip-style";

export type PreviewViewport = "desktop" | "tablet" | "mobile";
const VIEWPORT_WIDTH = { desktop: 1440, tablet: 900, mobile: 390 } as const;
const FRAME_HEIGHT = 1000;
const FRAME_DOCUMENT = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>';

export function TripPreviewSizePicker({
  value,
  onChange,
  label = "预览尺寸",
}: {
  value: PreviewViewport;
  onChange: (viewport: PreviewViewport) => void;
  label?: string;
}) {
  return (
    <div className="editor-viewport-switch" role="group" aria-label={label}>
      {(["desktop", "tablet", "mobile"] as const).map((size) => (
        <button
          type="button"
          key={size}
          className={value === size ? "active" : ""}
          aria-pressed={value === size}
          onClick={() => onChange(size)}
        >
          {size === "desktop" ? "桌面" : size === "tablet" ? "平板" : "手机"}
        </button>
      ))}
    </div>
  );
}

export default function TripPreviewFrame({
  document: trip,
  locale,
  viewport = "mobile",
  imageUrl,
}: {
  document: TripDocument;
  locale: TripDocumentLocale;
  viewport?: PreviewViewport;
  imageUrl: (filename: string) => string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameDocument, setFrameDocument] = useState<Document | null>(null);
  const [availableWidth, setAvailableWidth] = useState(390);
  const [styleError, setStyleError] = useState(false);
  const width = VIEWPORT_WIDTH[viewport];
  const scale = Math.min(1, availableWidth / width);
  const sections = useMemo(() => deriveTripEntrySections(trip, locale), [trip, locale]);
  const cover = trip.images.find((image) => image.id === trip.metadata.coverImageId);
  const style = resolveTripStyle(trip.metadata.style);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => setAvailableWidth(container.clientWidth));
    observer.observe(container);
    setAvailableWidth(container.clientWidth);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!frameDocument) return;
    const source = iframeRef.current?.ownerDocument;
    if (!source) return;
    let copies: Element[] = [];
    const syncStyles = () => {
      copies.forEach((node) => node.remove());
      copies = Array.from(source.head.querySelectorAll('style, link[rel="stylesheet"]')).map((node) => {
        const copy = node.cloneNode(true);
        if (!(copy instanceof Element)) throw new Error("Unable to copy preview stylesheet.");
        copy.addEventListener("error", () => setStyleError(true));
        frameDocument.head.appendChild(copy);
        return copy;
      });
    };
    const syncTheme = () => {
      const html = frameDocument.documentElement;
      html.className = source.documentElement.className;
      html.style.cssText = source.documentElement.style.cssText;
      html.dataset.theme = source.documentElement.dataset.theme ?? "light";
      html.lang = locale === "zh" ? "zh-CN" : "en";
    };
    syncStyles();
    syncTheme();
    const stylesObserver = new MutationObserver(syncStyles);
    stylesObserver.observe(source.head, { childList: true, subtree: true, characterData: true });
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(source.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    return () => {
      stylesObserver.disconnect();
      themeObserver.disconnect();
      copies.forEach((node) => node.remove());
    };
  }, [frameDocument, locale]);

  return (
    <div ref={containerRef} className="editor-frame-container">
      {!cover && <p className="editor-alert error" role="alert">请先选择有效的封面图片。</p>}
      {styleError && (
        <p className="editor-alert error" role="alert">
          预览样式加载失败。请重新载入编辑器后再审批。
        </p>
      )}
      <div className="editor-frame-shell" style={{ width: width * scale, height: FRAME_HEIGHT * scale }}>
        <iframe
          ref={iframeRef}
          title={`${locale === "zh" ? "中文" : "English"} · ${viewport} · ${width}px`}
          sandbox="allow-same-origin"
          srcDoc={FRAME_DOCUMENT}
          onLoad={() => {
            const target = iframeRef.current?.contentDocument;
            if (!target) throw new Error("The local preview frame could not be opened.");
            setFrameDocument(target);
          }}
          style={{
            width,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
          }}
        />
      </div>
      {frameDocument && cover && createPortal(
        <TripPresentation
          key={trip.slug}
          locale={locale}
          style={style}
          coverImage={imageUrl(cover.filename)}
          sections={sections}
        >
          <TripDocumentRenderer document={trip} locale={locale} imageUrl={imageUrl} />
        </TripPresentation>,
        frameDocument.body,
      )}
    </div>
  );
}
