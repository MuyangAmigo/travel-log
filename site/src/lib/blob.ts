import { localTripImage } from "./local-trip-images.ts";

const ACCOUNT = "junjieblob";
const CONTAINER = "images";
const PREFIX = "travel";

export function tripImage(slug: string, filename: string): string {
  return localTripImage(slug, filename) ??
    `https://${ACCOUNT}.blob.core.windows.net/${CONTAINER}/${PREFIX}/${slug}/${filename}`;
}
