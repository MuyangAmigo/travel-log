import { defaultLocale } from "@/lib/trips";
import { withBasePath } from "@/lib/base-path";

export default function Root() {
  const href = withBasePath(`/${defaultLocale}/`);
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
