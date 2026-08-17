"use client";

import { useEffect, useState, type ReactNode } from "react";

type IndexView = "gallery" | "list";

interface Props {
  children: ReactNode;
  labels: {
    group: string;
    gallery: string;
    list: string;
  };
  tagline: string;
}

const STORAGE_KEY = "travel-log-index-view";

function isIndexView(value: string | null): value is IndexView {
  return value === "gallery" || value === "list";
}

export default function IndexViewSwitcher({
  children,
  labels,
  tagline,
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
      <div className="index-toolbar">
        <p className="index-tagline">{tagline}</p>
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
      </div>

      <div className="trip-grid" data-view={view}>
        {children}
      </div>
    </>
  );
}
