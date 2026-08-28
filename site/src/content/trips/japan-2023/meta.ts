import type { TripMeta } from "@/lib/trips";
import { tripImage } from "@/lib/blob";
import {
  parseTripDocument,
  tripDocumentToMeta,
} from "@/lib/trip-document";
import content from "./content.json";

export const SLUG = "japan-2023";

export const img = (filename: string) => tripImage(SLUG, filename);

export const document = parseTripDocument(content);

if (document.slug !== SLUG) {
  throw new Error(`Trip document slug "${document.slug}" does not match "${SLUG}"`);
}

export const meta: TripMeta = {
  ...tripDocumentToMeta(document, img),
  slug: SLUG,
  private: document.metadata.private,
};
