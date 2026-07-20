import { MetadataRoute } from "next";
import { siteConfig, plans } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/sobre", "/planos", "/contato", "/privacidade", "/termos"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const planRoutes = plans.map((plan) => ({
    url: `${siteConfig.url}/planos/${plan.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...planRoutes];
}
