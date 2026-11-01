import { createTripLocale } from "@/components/TripDocumentRenderer";
import { document, img } from "./meta";

const { Content, sections } = createTripLocale(document, "en", img);

export { sections };
export default Content;
