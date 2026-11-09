import type { MetadataRoute } from "next";
import { publicRouteUrls } from "@/lib/public-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRouteUrls().map((url) => ({ url }));
}
