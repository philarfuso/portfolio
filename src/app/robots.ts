import type { MetadataRoute } from "next";
import { publicSiteOrigin } from "@/lib/public-routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${publicSiteOrigin()}/sitemap.xml`,
  };
}
