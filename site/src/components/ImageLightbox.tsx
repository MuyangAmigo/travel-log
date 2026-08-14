"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/trips";

type SelectedImage = {
  src: string;
  alt: string;
};

const labels = {
  zh: {
    dialog: "图片预览",
    close: "关闭图片预览",
    open: "查看大图",
  },
  en: {
    dialog: "Image preview",
    close: "Close image preview",
    open: "View full image",
  },
} satisfies Record<Locale, Record<"dialog" | "close" | "open", string>>;

export default function ImageLightbox({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<SelectedImage | null>(null);
  const sourceImage = useRef<HTMLImageElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const copy = labels[locale];

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".trip-content");
    if (!root) return;

    const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
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
        src: image.currentSrc || image.src,
        alt: image.alt,
      });
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLImageElement && root.contains(event.target)) {
        openImage(event.target);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLImageElement &&
        root.contains(event.target) &&
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
  }, [copy]);

  useEffect(() => {
    if (!selected) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      sourceImage.current?.focus();
    };
  }, [selected]);

  if (!selected) return null;

  return createPortal(
    <div
      className="image-lightbox"
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
    </div>,
    document.body,
  );
}
