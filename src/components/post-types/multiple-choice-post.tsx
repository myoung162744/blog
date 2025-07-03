'use client'

import React, { useState } from 'react';
import type { MultipleChoicePost } from '@/types/blog';

interface MultipleChoicePostProps {
  post: MultipleChoicePost;
  onComplete?: () => void;
}

export default function MultipleChoicePost({ post, onComplete }: MultipleChoicePostProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    setTimeout(() => setShowQuestions(true), 500);
  };

  const handleContinue = () => {
    setShowFullPost(true);
    onComplete?.();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Initial Multiple Choice Question */}
        <div className={`transition-all duration-500 ${showFullPost ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {/* Question Box */}
          <div className="bg-white border-2 border-black rounded-lg p-8 mb-6" style={{
            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
          }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{post.question}</h2>
            <p className="text-gray-800 font-medium">Select the correct answer:</p>
          </div>

          {/* Answer Options */}
          <div className="bg-white border-2 border-black rounded-lg p-6 mb-6" style={{
            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
          }}>
            <div className="space-y-3">
              {post.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index + 1)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 text-gray-900 ${
                    selectedAnswer === index + 1
                      ? 'bg-blue-100 border-blue-600'
                      : 'bg-white border-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="font-mono font-bold mr-3 text-gray-900">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Follow-up Questions */}
        <div className={`transition-all duration-700 transform mt-6 ${showQuestions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {showQuestions && !showFullPost && (
            <div className="bg-white border-2 border-black rounded-lg p-8" style={{
              boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
            }}>
              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-900">{post.followUpContent.question}</p>
                <p className="text-3xl font-bold text-gray-900">{post.followUpContent.subheading}</p>
                <p className="text-gray-800 italic font-medium">{post.followUpContent.description}</p>
              </div>
              
              <button
                onClick={handleContinue}
                className="w-full py-3 px-6 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Continue Reading →
              </button>
            </div>
          )}
        </div>

        {/* Full Blog Post */}
        <div className={`transition-all duration-700 ${showFullPost ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {showFullPost && (
            <article className="bg-white border-2 border-black rounded-lg p-8 md:p-12" style={{
              boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
            }}>
              <div className="max-w-none">
                {/* Question Recap */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                  <p className="font-mono text-sm mb-3 text-gray-900 font-semibold">{post.question}</p>
                  <div className="space-y-1 text-sm text-gray-900 font-mono">
                    {post.options.map((option, index) => (
                      <div key={index} className="flex">
                        <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.mainContent }} />
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
} 