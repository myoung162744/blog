import Link from 'next/link'

const posts = [
  {
    slug: 'interactive-multiple-choice',
    title: 'Interactive Multiple Choice Post',
    description: 'An interactive blog post with multiple choice questions',
    date: '2024-03-20'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <time className="text-sm text-gray-500">{post.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
