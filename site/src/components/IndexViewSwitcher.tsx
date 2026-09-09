"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/trips";
import ThemeToggle from "@/components/ThemeToggle";

type IndexView = "gallery" | "list";

interface Props {
  children: ReactNode;
  locale: Locale;
  languageSwitcher: ReactNode;
  labels: {
    group: string;
    gallery: string;
    list: string;
    controls: string;
    moreOptions: string;
    edit: string;
  };
}

const STORAGE_KEY = "travel-log-index-view";

function isIndexView(value: string | null): value is IndexView {
  return value === "gallery" || value === "list";
}

export default function IndexViewSwitcher({
  children,
  locale,
  languageSwitcher,
  labels,
}: Props) {
  const [view, setView] = useState<IndexView>("gallery");

  useEffect(() => {
    try {
      const savedView = window.localStorage.getItem(STORAGE_KEY);
      if (isIndexView(savedView)) setView(savedView);
    } catch (error) {
      console.warn("Unable to read the saved index view preference.", error);
    }
  }, []);

  function selectView(nextView: IndexView) {
    setView(nextView);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextView);
    } catch (error) {
      console.warn("Unable to save the index view preference.", error);
    }
  }

  return (
    <>
      <div className="trip-grid" data-view={view}>
        {children}
      </div>

      <aside className="index-controls" aria-label={labels.controls}>
        {languageSwitcher}
        <span className="control-divider" aria-hidden="true" />
        <div className="index-view-switch" role="group" aria-label={labels.group}>
          <button
            type="button"
            className={view === "gallery" ? "active" : ""}
            aria-label={labels.gallery}
            aria-pressed={view === "gallery"}
            title={labels.gallery}
            onClick={() => selectView("gallery")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button
            type="button"
            className={view === "list" ? "active" : ""}
            aria-label={labels.list}
            aria-pressed={view === "list"}
            title={labels.list}
            onClick={() => selectView("list")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4" width="5" height="5" rx="1" />
              <path d="M12 6.5h9" />
              <rect x="3" y="15" width="5" height="5" rx="1" />
              <path d="M12 17.5h9" />
            </svg>
          </button>
        </div>
        <span className="control-divider" aria-hidden="true" />
        <ThemeToggle locale={locale} />
        <button
          type="button"
          className="index-more-button"
          popoverTarget="index-more-options"
          aria-label={labels.moreOptions}
          title={labels.moreOptions}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
        <div id="index-more-options" className="index-more-options" popover="auto">
          <Link href="/edit">{labels.edit}</Link>
        </div>
      </aside>
    </>
  );
}
