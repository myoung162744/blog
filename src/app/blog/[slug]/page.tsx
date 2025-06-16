import MultipleChoiceBlogPost from '@/components/multiple-choice-blog-post'

export default function BlogPost({ params }: { params: { slug: string } }) {
  // In a real blog, you would fetch the post content based on the slug
  // For now, we'll just render the interactive post component
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <MultipleChoiceBlogPost />
    </main>
  )
} 