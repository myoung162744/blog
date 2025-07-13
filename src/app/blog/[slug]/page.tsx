import PostFactory from '@/components/core/post-factory';
import { getPostBySlug, getAllPostSlugs } from '@/lib/content-loader';
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

  return (
    <main>
      <PostFactory post={post} />
    </main>
  );
} 