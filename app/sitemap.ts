import type { MetadataRoute } from 'next';
import { TOOLS, toolHref } from '@/lib/tools';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...TOOLS.map((tool) => ({
      url: `${SITE_URL}${toolHref(tool)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      // Tool pages are the point of the site, so they outrank the
      // legal pages but sit just under the index.
      priority: 0.8,
    })),
    ...['/privacy', '/terms', '/contact'].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
