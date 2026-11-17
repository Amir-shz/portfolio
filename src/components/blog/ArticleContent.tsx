import Image from "next/image";
import parse, { Element, type DOMNode, type HTMLReactParserOptions } from "html-react-parser";

// Renders the sanitized post HTML on the server. Images become next/image
// (optimized, lazy, with reserved space so nothing jumps while loading).
const options: HTMLReactParserOptions = {
  replace(node: DOMNode) {
    if (!(node instanceof Element) || node.name !== "img") return undefined;
    const { src, alt = "", width, height } = node.attribs;
    const w = Number(width);
    const h = Number(height);
    if (!src) return <></>;
    if (w > 0 && h > 0) {
      return (
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(min-width: 1024px) 720px, 94vw"
          loading="lazy"
        />
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" decoding="async" />;
  },
};

function ArticleContent({ html }: { html: string }) {
  return <div className="prose-blog">{parse(html, options)}</div>;
}

export default ArticleContent;
