import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content-loader-optimized';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chalkandcode.com';
  
  // Get all blog posts
  const posts = getAllPosts();
  
  // Create sitemap entries for blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];
  
  return [...staticPages, ...blogPosts];
}