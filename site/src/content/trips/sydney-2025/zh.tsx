import { createTripLocale } from "@/components/TripDocumentRenderer";
import { document, img } from "./meta";

const trip = createTripLocale(document, "zh", img);

export const sections = trip.sections;
export default trip.Content;
