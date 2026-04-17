import { defaultLocale } from "@/lib/trips";

export default function Root() {
  const href = `/${defaultLocale}/`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(href)});`,
        }}
      />
      <noscript>
        <a href={href}>Continue to {defaultLocale}</a>
      </noscript>
    </>
  );
}
