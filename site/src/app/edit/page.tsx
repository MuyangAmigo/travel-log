import type { Metadata } from "next";
import EditorApp from "@/components/editor/EditorApp";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "旅行日记编辑器",
  description: "Owner-only visual editor for existing registered travel journals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditorPage() {
  return (
    <>
      <SiteHeader locale="zh" />
      <EditorApp />
    </>
  );
}
