"use client";

import { useEffect } from "react";

export default function CardScaleController() {
  useEffect(() => {
    function sync() {
      document.querySelectorAll<HTMLElement>(".card-wrap").forEach((wrap) => {
        const card = wrap.querySelector<HTMLElement>(".card");
        if (!card) return;
        const s = parseFloat(getComputedStyle(wrap).getPropertyValue("--s"));
        wrap.style.height = card.offsetHeight * s + "px";
      });
    }
    sync();
    window.addEventListener("load", sync);
    window.addEventListener("resize", sync);
    document.fonts?.ready?.then(sync);
    return () => {
      window.removeEventListener("load", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);
  return null;
}
