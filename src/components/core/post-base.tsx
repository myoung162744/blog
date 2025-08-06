'use client'

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface PostBaseProps {
  post: BlogPost;
  onComplete?: () => void;
}

export default function PostBase({ post }: PostBaseProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">Chalk and Code</span>
          </Link>
        </div>

        <article className="bg-white border-2 border-black rounded-lg p-8 md:p-12" style={{
          boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
        }}>
          <div className="max-w-none">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center space-x-4 mb-8">
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
            
            {/* Content */}
            <div className="prose max-w-none">
              {post.type === 'text' ? (
                <div dangerouslySetInnerHTML={{ __html: post.mainContent }} />
              ) : (
                <p className="text-gray-700">{post.content}</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 