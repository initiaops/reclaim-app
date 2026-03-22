import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.getreclaimapp.com',
      lastModified: '2025-03-01',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.getreclaimapp.com/pricing',
      lastModified: '2025-03-01',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.getreclaimapp.com/guide',
      lastModified: '2025-03-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.getreclaimapp.com/signup',
      lastModified: '2025-03-01',
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/login',
      lastModified: '2025-03-01',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.getreclaimapp.com/privacy',
      lastModified: '2025-03-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.getreclaimapp.com/terms',
      lastModified: '2025-03-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
