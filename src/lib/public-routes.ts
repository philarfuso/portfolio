import { portfolioProjects } from "../content/projects.ts";
import { normalizeSiteUrl } from "./site-url.ts";

export function publicSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") {
  return normalizeSiteUrl(value).origin;
}

export function publicRouteUrls(value?: string) {
  const origin = publicSiteOrigin(value);
  const paths = ["/", "/work", "/resume", "/consulting", "/contact", ...portfolioProjects.map((project) => project.route)];
  return paths.map((path) => new URL(path, origin).href);
}
