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
  locale: "zh" | "en";
  sections?: readonly TripEntrySection[];
};

const COPY = {
  zh: {
    navigation: "旅程章节",
    current: "当前章节",
    progress: "阅读进度",
    page: "第 {page} 页",
    marker: "页面 {page}",
  },
  en: {
    navigation: "Trip chapters",
    current: "Current chapter",
    progress: "Reading progress",
    page: "Page {page}",
    marker: "PAGE {page}",
  },
} as const;

function getText(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function truncate(value: string, maxLength = 110): string {
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 1).trimEnd()}…`
    : value;
}

function getMarker(card: HTMLElement, page: string, locale: "zh" | "en") {
  if (card.dataset.tripMarker) return card.dataset.tripMarker;

  const dayCircle = card.querySelector(".day-circle");
  if (dayCircle) {
    const parts = Array.from(dayCircle.querySelectorAll(":scope > span"))
      .map(getText)
      .filter(Boolean);
    const marker = parts.length > 0 ? parts.join(" ") : getText(dayCircle);
    if (marker) return marker;
  }

  return COPY[locale].marker.replace("{page}", page);
}

function getLabel(card: HTMLElement, page: string, locale: "zh" | "en") {
  return (
    card.dataset.tripLabel ||
    getText(card.querySelector(".day-title")) ||
    getText(card.querySelector(".cover-title")) ||
    getText(card.querySelector(".nbox-lbl")) ||
    getText(card.querySelector(".bill h4")) ||
    COPY[locale].page.replace("{page}", page)
  );
}

function getDetail(card: HTMLElement) {
  if (card.dataset.tripDetail) return card.dataset.tripDetail;

  const subtitle = getText(card.querySelector(".day-sub"));
  if (subtitle) return subtitle;

  const coverDetail = [
    getText(card.querySelector(".cover-subtitle")),
    getText(card.querySelector(".cover-date")),
  ]
    .filter(Boolean)
    .join(" · ");
  if (coverDetail) return coverDetail;

  return truncate(getText(card.querySelector(".jtxt p")));
}

function discoverSections(
  cards: HTMLElement[],
  locale: "zh" | "en"
): TripEntrySection[] {
  const discovered = new Map<string, TripEntrySection>();

  cards.forEach((card, index) => {
    const page = String(index + 1).padStart(2, "0");
    const id = card.dataset.tripSection?.trim() || `trip-section-${index + 1}`;
    card.dataset.tripSection = id;

    if (!discovered.has(id)) {
      if (!card.id) card.id = id;
      discovered.set(id, {
        id,
        marker: getMarker(card, page, locale),
        label: getLabel(card, page, locale),
        detail: getDetail(card),
      });
    }
  });

  return Array.from(discovered.values());
}

export default function TripEntryLayout({
  children,
  className,
  locale,
  sections,
}: TripEntryLayoutProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<readonly TripEntrySection[]>(
    sections ?? []
  );
  const [activeId, setActiveId] = useState(sections?.[0]?.id ?? "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".card-wrap"));
    if (cards.length === 0) return;

    const discoveredSections = discoverSections(cards, locale);
    const nextSections = sections?.length ? sections : discoveredSections;
    setVisibleSections(nextSections);
    setActiveId((current) =>
      nextSections.some((section) => section.id === current)
        ? current
        : nextSections[0]?.id ?? ""
    );

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
  }, [locale, sections]);

  const activeIndex = Math.max(
    0,
    visibleSections.findIndex((section) => section.id === activeId)
  );
  const activeSection = visibleSections[activeIndex] ?? visibleSections[0];
  const labels = COPY[locale];

  return (
    <div
      ref={rootRef}
      className={["trip-entry-layout", className].filter(Boolean).join(" ")}
    >
      <aside className="trip-entry-rail trip-entry-rail-left">
        <nav className="trip-entry-rail-card" aria-label={labels.navigation}>
          <div className="trip-entry-rail-kicker">{labels.navigation}</div>
          <div className="trip-entry-nav">
            {visibleSections.map((section) => (
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
        {activeSection && (
          <details>
            <summary>
              <span>{activeSection.marker}</span>
              <strong>{activeSection.label}</strong>
            </summary>
            <nav aria-label={labels.navigation}>
              {visibleSections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{section.marker}</span>
                  {section.label}
                </a>
              ))}
            </nav>
          </details>
        )}
      </div>

      <main className="trip-entry-main">{children}</main>

      <aside className="trip-entry-rail trip-entry-rail-right">
        {activeSection && (
          <div className="trip-entry-rail-card" aria-live="polite">
            <div className="trip-entry-rail-kicker">{labels.current}</div>
            <div className="trip-entry-current-marker">{activeSection.marker}</div>
            <h2>{activeSection.label}</h2>
            <p>{activeSection.detail}</p>
            <div
              className="trip-entry-progress"
              role="progressbar"
              aria-label={labels.progress}
              aria-valuemin={1}
              aria-valuemax={visibleSections.length}
              aria-valuenow={activeIndex + 1}
            >
              <span
                style={{
                  transform: `scaleX(${(activeIndex + 1) / visibleSections.length})`,
                }}
              />
            </div>
            <div className="trip-entry-progress-label">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(visibleSections.length).padStart(2, "0")}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
