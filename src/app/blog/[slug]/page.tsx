import PostFactory from '@/components/core/post-factory';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/content-loader';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
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
  const nextSlug = nextPost ? nextPost.slug : null;

  return (
    <main>
      <PostFactory post={post} slug={slug} nextSlug={nextSlug} />
    </main>
  );
} 