import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "فاطمه شفیعی",
    short_name: "فاطمه شفیعی",
    description: "فاطمه شادات شفیعی | روانشناس صنعتی و سازمانی",
    start_url: "/",
    display: "standalone",
    background_color: "#EFE6FD",
    theme_color: "#EFE6FD",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
