import Link from 'next/link'
import { getAllPosts } from '@/lib/content-loader'

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Blog Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-700">No posts found. Add some markdown files to get started!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]" style={{
                boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
              }}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center space-x-4 mb-4">
                    <time className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded">
                      {post.metadata.date}
                    </time>
                    <span className="text-sm font-mono text-blue-600 bg-blue-100 px-3 py-1 rounded">
                      {post.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.metadata.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold">
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 