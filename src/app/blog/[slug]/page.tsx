import PostFactory from '@/components/core/post-factory';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/content-loader';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams?: { [key: string]: string | string[] | undefined }
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = typeof (params as any).then === 'function' ? await params : params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post could not be found.'
    };
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://chalkandcode.blog/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = typeof (params as any).then === 'function' ? await params : params;
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