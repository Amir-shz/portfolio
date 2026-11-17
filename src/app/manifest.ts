import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "مشاوره شفیعی",
    short_name: "مشاوره شفیعی",
    description: "فاطمه سادات شفیعی | روانشناس صنعتی و سازمانی",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F1F8",
    theme_color: "#F3F1F8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
