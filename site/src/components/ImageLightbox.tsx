"use client";

import { useCallback, useEffect, useRef, useState, type RefObject, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/trips";
import styles from "./ImageLightbox.module.css";

type SelectedImage = {
  src: string;
  alt: string;
  index: number;
  total: number;
};

const labels = {
  zh: {
    dialog: "图片预览",
    close: "关闭图片预览",
    open: "查看大图",
    previous: "上一张",
    next: "下一张",
  },
  en: {
    dialog: "Image preview",
    close: "Close image preview",
    open: "View full image",
    previous: "Previous image",
    next: "Next image",
  },
} satisfies Record<Locale, Record<"dialog" | "close" | "open" | "previous" | "next", string>>;

export default function ImageLightbox({
  locale,
  rootRef,
  contentKey,
}: {
  locale: Locale;
  rootRef: RefObject<HTMLElement | null>;
  contentKey?: ReactNode;
}) {
  const [selected, setSelected] = useState<SelectedImage | null>(null);
  const sourceImage = useRef<HTMLImageElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const libraryImages = useRef<HTMLImageElement[]>([]);
  const copy = labels[locale];
  const isOpen = selected !== null;

  const stepImage = useCallback((offset: number) => {
    setSelected((current) => {
      if (!current || current.total < 2) return current;
      const index = current.index + offset;
      const image = libraryImages.current[index];
      if (!image) return current;
      sourceImage.current = image;
      return {
        src: image.dataset.fullSrc || image.currentSrc || image.src,
        alt: image.alt,
        index,
        total: current.total,
      };
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current?.querySelector<HTMLElement>(".trip-content");
    const viewport = root?.ownerDocument.defaultView;
    if (!root || !viewport) return;

    const images = Array.from(root.querySelectorAll<HTMLImageElement>('img:not([aria-hidden="true"])'));
    libraryImages.current = images.filter((image) => image.dataset.fullSrc);
    const originalAttributes = images.map((image) => ({
      image,
      role: image.getAttribute("role"),
      tabIndex: image.getAttribute("tabindex"),
      ariaLabel: image.getAttribute("aria-label"),
    }));

    images.forEach((image) => {
      image.setAttribute("role", "button");
      image.tabIndex = 0;
      image.setAttribute(
        "aria-label",
        image.alt ? `${copy.open}: ${image.alt}` : copy.open,
      );
    });

    const openImage = (image: HTMLImageElement) => {
      sourceImage.current = image;
      setSelected({
        src: image.dataset.fullSrc || image.currentSrc || image.src,
        alt: image.alt,
        index: libraryImages.current.indexOf(image),
        total: image.dataset.fullSrc ? libraryImages.current.length : 0,
      });
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof viewport.HTMLImageElement && images.includes(event.target)) {
        openImage(event.target);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof viewport.HTMLImageElement &&
        images.includes(event.target) &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        openImage(event.target);
      }
    };

    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeyDown);

    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeyDown);
      originalAttributes.forEach(({ image, role, tabIndex, ariaLabel }) => {
        if (role === null) image.removeAttribute("role");
        else image.setAttribute("role", role);
        if (tabIndex === null) image.removeAttribute("tabindex");
        else image.setAttribute("tabindex", tabIndex);
        if (ariaLabel === null) image.removeAttribute("aria-label");
        else image.setAttribute("aria-label", ariaLabel);
      });
    };
  }, [copy, rootRef, contentKey]);

  useEffect(() => {
    if (!isOpen) return;
    const document = rootRef.current?.ownerDocument;
    if (!document) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        stepImage(event.key === "ArrowLeft" ? -1 : 1);
      } else if (event.key === "Tab") {
        event.preventDefault();
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
        const index = buttons.findIndex((button) => button === document.activeElement);
        const next = (index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
        buttons[next]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      sourceImage.current?.focus();
    };
  }, [isOpen, rootRef, stepImage]);

  const portalRoot = rootRef.current?.ownerDocument.body;
  if (!selected || !portalRoot) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={`image-lightbox${selected.total > 1 ? ` ${styles.library}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={copy.dialog}
      onClick={(event) => {
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      <button
        ref={closeButton}
        type="button"
        className="image-lightbox-close"
        aria-label={copy.close}
        onClick={() => setSelected(null)}
      >
        <span aria-hidden="true">×</span>
      </button>
      <img src={selected.src} alt={selected.alt} className="image-lightbox-image" />
      {selected.total > 1 && (
        <div className={styles.navigation}>
          <button type="button" disabled={selected.index === 0} onClick={() => stepImage(-1)} aria-label={copy.previous}>
            <span aria-hidden="true">←</span>
          </button>
          <span role="status" aria-live="polite">{selected.index + 1} / {selected.total}</span>
          <button type="button" disabled={selected.index === selected.total - 1} onClick={() => stepImage(1)} aria-label={copy.next}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>,
    portalRoot,
  );
}
