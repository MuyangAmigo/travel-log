"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type TripEntrySection = {
  id: string;
  marker: string;
  label: string;
  detail: string;
};

type TripEntryLayoutProps = {
  children: ReactNode;
  className?: string;
  labels: {
    navigation: string;
    current: string;
    progress: string;
  };
  sections: readonly TripEntrySection[];
};

export default function TripEntryLayout({
  children,
  className,
  labels,
  sections,
}: TripEntryLayoutProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-trip-section]")
    );
    if (cards.length === 0) return;

    let frame = 0;

    function syncActiveSection() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const activationLine = window.innerHeight * 0.34;
        let active = cards[0];

        for (const card of cards) {
          if (card.getBoundingClientRect().top > activationLine) break;
          active = card;
        }

        const nextId = active.dataset.tripSection;
        if (nextId) setActiveId(nextId);
      });
    }

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId)
  );
  const activeSection = sections[activeIndex] ?? sections[0];

  return (
    <div
      ref={rootRef}
      className={["trip-entry-layout", className].filter(Boolean).join(" ")}
    >
      <aside className="trip-entry-rail trip-entry-rail-left">
        <nav className="trip-entry-rail-card" aria-label={labels.navigation}>
          <div className="trip-entry-rail-kicker">{labels.navigation}</div>
          <div className="trip-entry-nav">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={section.id === activeId ? "active" : undefined}
                aria-current={section.id === activeId ? "location" : undefined}
              >
                <span className="trip-entry-nav-marker">{section.marker}</span>
                <span>{section.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      <div className="trip-entry-compact">
        <details>
          <summary>
            <span>{activeSection?.marker}</span>
            <strong>{activeSection?.label}</strong>
          </summary>
          <nav aria-label={labels.navigation}>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{section.marker}</span>
                {section.label}
              </a>
            ))}
          </nav>
        </details>
      </div>

      <main className="trip-entry-main">{children}</main>

      <aside className="trip-entry-rail trip-entry-rail-right">
        <div className="trip-entry-rail-card" aria-live="polite">
          <div className="trip-entry-rail-kicker">{labels.current}</div>
          <div className="trip-entry-current-marker">{activeSection?.marker}</div>
          <h2>{activeSection?.label}</h2>
          <p>{activeSection?.detail}</p>
          <div
            className="trip-entry-progress"
            role="progressbar"
            aria-label={labels.progress}
            aria-valuemin={1}
            aria-valuemax={sections.length}
            aria-valuenow={activeIndex + 1}
          >
            <span
              style={{
                transform: `scaleX(${(activeIndex + 1) / sections.length})`,
              }}
            />
          </div>
          <div className="trip-entry-progress-label">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(sections.length).padStart(2, "0")}
          </div>
        </div>
      </aside>
    </div>
  );
}
