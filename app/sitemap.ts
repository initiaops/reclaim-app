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
      url: 'https://www.getreclaimapp.com/blog',
      lastModified: '2025-03-20',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/automate-crm-data-entry',
      lastModified: '2025-03-10',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/best-ai-tools-for-sales-reps-2025',
      lastModified: '2025-03-15',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/how-to-extract-meddic-from-sales-calls',
      lastModified: '2025-03-20',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/hubspot-crm-tips-small-business',
      lastModified: '2025-04-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/what-is-meddic-sales-framework',
      lastModified: '2025-04-05',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.getreclaimapp.com/blog/sales-call-transcript-software',
      lastModified: '2025-04-10',
      changeFrequency: 'monthly',
      priority: 0.7,
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
