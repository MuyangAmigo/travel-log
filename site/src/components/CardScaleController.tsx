"use client";

import { useEffect, type RefObject, type ReactNode } from "react";

export default function CardScaleController({
  rootRef,
  contentKey,
}: {
  rootRef: RefObject<HTMLElement | null>;
  contentKey?: ReactNode;
}) {
  useEffect(() => {
    const root = rootRef.current;
    const viewport = root?.ownerDocument.defaultView;
    if (!root || !viewport) return;
    let cancelled = false;

    const sync = () => {
      root.querySelectorAll<HTMLElement>(".card-wrap").forEach((wrap) => {
        const card = wrap.querySelector<HTMLElement>(".card");
        if (!card) return;
        const s = parseFloat(viewport.getComputedStyle(wrap).getPropertyValue("--s"));

        if (
          !Number.isFinite(s) ||
          Math.abs(s - 1) < 0.001 ||
          viewport.getComputedStyle(card).transform === "none"
        ) {
          wrap.style.removeProperty("height");
          return;
        }

        wrap.style.height = card.offsetHeight * s + "px";
      });
    };

    const observer =
      typeof viewport.ResizeObserver === "undefined" ? null : new viewport.ResizeObserver(sync);
    if (observer) {
      root
        .querySelectorAll<HTMLElement>(".card-wrap .card")
        .forEach((card) => observer.observe(card));
    }

    sync();
    viewport.addEventListener("load", sync);
    viewport.addEventListener("resize", sync);
    root.ownerDocument.fonts?.ready?.then(() => {
      if (!cancelled) sync();
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      viewport.removeEventListener("load", sync);
      viewport.removeEventListener("resize", sync);
    };
  }, [rootRef, contentKey]);
  return null;
}
