import PostFactory from '@/components/core/post-factory';
import { getPostBySlug, getAllPostSlugs } from '@/lib/content-loader';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main>
      <PostFactory post={post} />
    </main>
  );
} 