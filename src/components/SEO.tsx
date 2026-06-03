import { useEffect } from "react";

const BASE_URL = "https://materia-restaurante.com";

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  path?: string;
}

export default function SEO({
  title,
  description = "Materia es una experiencia gastronómica donde la alta cocina se encuentra con el arte. Reserva tu velada.",
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
  ogType = "website",
  path = "",
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Materia — Alta Cocina`;
    const url = `${BASE_URL}${path}`;

    const snapshots = new Map<string, string>();
    const save = (sel: string, attr: string) => {
      const el = document.querySelector(sel);
      snapshots.set(sel, el?.getAttribute(attr) ?? "");
    };
    const set = (sel: string, attr: string, val: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const match = sel.match(/\[(\w+)=(["'])([^"']+)\2\]/);
        if (match) el.setAttribute(match[1], match[3]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    const restore = (sel: string, attr: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, snapshots.get(sel) ?? "");
    };

    save('meta[name="description"]', "content");
    save('meta[property="og:title"]', "content");
    save('meta[property="og:description"]', "content");
    save('meta[property="og:image"]', "content");
    save('meta[property="og:url"]', "content");
    save('meta[property="og:type"]', "content");
    save('meta[name="twitter:card"]', "content");
    save('meta[name="twitter:title"]', "content");
    save('meta[name="twitter:description"]', "content");
    save('meta[name="twitter:image"]', "content");
    save('link[rel="canonical"]', "href");

    document.title = fullTitle;
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", ogTitle ?? fullTitle);
    set('meta[property="og:description"]', "content", ogDescription ?? description);
    set('meta[property="og:image"]', "content", ogImage);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:type"]', "content", ogType);
    set('meta[name="twitter:card"]', "content", "summary_large_image");
    set('meta[name="twitter:title"]', "content", ogTitle ?? fullTitle);
    set('meta[name="twitter:description"]', "content", ogDescription ?? description);
    set('meta[name="twitter:image"]', "content", ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return () => {
      document.title = "Materia — Alta Cocina";
      restore('meta[name="description"]', "content");
      restore('meta[property="og:title"]', "content");
      restore('meta[property="og:description"]', "content");
      restore('meta[property="og:image"]', "content");
      restore('meta[property="og:url"]', "content");
      restore('meta[property="og:type"]', "content");
      restore('meta[name="twitter:card"]', "content");
      restore('meta[name="twitter:title"]', "content");
      restore('meta[name="twitter:description"]', "content");
      restore('meta[name="twitter:image"]', "content");
      restore('link[rel="canonical"]', "href");
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, path]);

  return null;
}
