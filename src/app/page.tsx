import Link from 'next/link'
import { getAllPosts } from '@/lib/content-loader-optimized'

export default function Home() {
  const posts = getAllPosts()
  const featuredPost = posts[0] // Most recent post
  const otherPosts = posts.slice(1) // Rest of the posts
  
  // If no posts are found, show a fallback message
  if (!featuredPost) {
    return (
      <div className="min-h-screen bg-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Chalk and Code</h1>
          <p className="text-xl text-gray-700">No posts found. Add some markdown files to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Chalk and Code</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Exploring ideas about education, technology, and the future of learning.
          </p>
        </div>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Post</h2>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <article className="bg-white border-2 border-black rounded-lg p-8 md:p-12 card-shadow card-shadow-hover group-hover:shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <time className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {featuredPost.metadata.date}
                  </time>
                  <span className="text-sm font-mono text-blue-600 bg-blue-100 px-3 py-1 rounded">
                    {featuredPost.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {featuredPost.metadata.readTime}
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {featuredPost.title}
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {featuredPost.content}
              </p>
              
              <div className="flex items-center text-blue-600 font-semibold">
                Read More
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </article>
          </Link>
        </section>

        {/* Other Posts Gallery */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <article className="bg-white border-2 border-black rounded-lg p-6 h-full card-shadow card-shadow-hover group-hover:shadow-lg">
                    <div className="flex items-center space-x-2 mb-4">
                      <time className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {post.metadata.date}
                      </time>
                      <span className="text-xs font-mono text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {post.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.metadata.readTime}</span>
                      <span className="text-blue-600 text-sm font-semibold group-hover:text-blue-700">
                        Read →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-white border-2 border-black rounded-lg p-8 card-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to see more?</h2>
            <p className="text-gray-700 mb-6">
              Explore all blog posts or learn more about interactive learning experiences.
            </p>
            <Link 
              href="/blog" 
              className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
