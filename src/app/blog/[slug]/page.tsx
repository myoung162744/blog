import PostFactory from '@/components/core/post-factory';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/content-loader-optimized';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const url = `https://chalkandcode.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.content,
    keywords: post.metadata.tags || ["education", "technology", "learning"],
    authors: [{ name: post.metadata.author }],
    openGraph: {
      title: post.title,
      description: post.content,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      url,
      siteName: 'Chalk and Code',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Get all posts sorted by date (descending)
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const nextPost = currentIndex !== -1 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextSlug = nextPost ? nextPost.slug : undefined;

  return (
    <main>
      <PostFactory post={post} nextSlug={nextSlug} />
    </main>
  );
} 