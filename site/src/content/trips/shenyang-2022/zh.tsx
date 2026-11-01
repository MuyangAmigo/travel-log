import { createTripLocale } from "@/components/TripDocumentRenderer";
import { document, img } from "./meta";

const { Content, sections } = createTripLocale(document, "zh", img);

export { sections };
export default Content;
