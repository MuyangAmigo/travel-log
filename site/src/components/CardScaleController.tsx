"use client";

import { useEffect } from "react";

export default function CardScaleController() {
  useEffect(() => {
    let cancelled = false;

    function sync() {
      document.querySelectorAll<HTMLElement>(".card-wrap").forEach((wrap) => {
        const card = wrap.querySelector<HTMLElement>(".card");
        if (!card) return;
        const s = parseFloat(getComputedStyle(wrap).getPropertyValue("--s"));

        if (
          !Number.isFinite(s) ||
          Math.abs(s - 1) < 0.001 ||
          getComputedStyle(card).transform === "none"
        ) {
          wrap.style.removeProperty("height");
          return;
        }

        wrap.style.height = card.offsetHeight * s + "px";
      });
    }

    const observer = new ResizeObserver(sync);
    document
      .querySelectorAll<HTMLElement>(".card-wrap .card")
      .forEach((card) => observer.observe(card));

    sync();
    window.addEventListener("load", sync);
    window.addEventListener("resize", sync);
    document.fonts?.ready?.then(() => {
      if (!cancelled) sync();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("load", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);
  return null;
}
