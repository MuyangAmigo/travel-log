import { createTripLocale } from "@/components/TripDocumentRenderer";
import { document, img } from "./meta";
import styles from "./entry.module.css";

const trip = createTripLocale(document, "zh", img);

export const sections = trip.sections;

export default function TaizhouZh() {
  return <div className={styles.entry}><trip.Content /></div>;
}
