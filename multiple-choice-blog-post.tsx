import React, { useState } from 'react';

export default function InteractiveBlogPost() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => setShowQuestions(true), 500);
  };

  const handleContinue = () => {
    setShowFullPost(true);
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
            <h2 className="text-2xl font-bold mb-4">What should Apple do right now about Siri?</h2>
            <p className="text-gray-600">Select the correct answer:</p>
          </div>

          {/* Answer Options */}
          <div className="bg-white border-2 border-black rounded-lg p-6 mb-6" style={{
            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
          }}>
            <div className="space-y-3">
              {[
                "Release an assistant that might not meet Apple's historic standards",
                "Continue to delay the launch until it reaches their standards",
                "Purchase a company like Cohere that could accelerate their AI progress",
                "Be the counter of the AI hype and push against it"
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index + 1)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index + 1
                      ? 'bg-blue-100 border-blue-600'
                      : 'bg-white border-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="font-mono font-bold mr-3">{index + 1}.</span> {option}
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
                <p className="text-xl">So which is the correct answer?</p>
                <p className="text-3xl font-bold">Is there a correct answer?</p>
                <p className="text-gray-600 italic">This is what a question in real life looks like.</p>
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
                  <p className="font-mono text-sm mb-3">What should Apple do right now about Siri?</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 font-mono">
                    <li>Release an assistant that might not meet Apple's historic standards</li>
                    <li>Continue to delay the launch until it reaches their standards</li>
                    <li>Purchase a company like Cohere that could accelerate their AI progress</li>
                    <li>Be the counter of the AI hype and push against it</li>
                  </ol>
                </div>

                <p className="text-xl mb-2">So which is the correct answer?</p>
                <p className="text-3xl font-bold mb-6">Is there a correct answer?</p>
                <p className="mb-8 text-gray-600 italic">This is what a question in real life looks like.</p>

                <p className="mb-6">Yet, to prepare kids for this we simplify the world. Tell them we know all the answers. That's what school teaches you: the answers.</p>

                <p className="mb-8 font-semibold">Life is not chess, it's poker. There's uncertainty. There isn't a correct answer.</p>

                <p className="mb-6">I get why we do this. Multiple choice is efficient. It scales. It's fair. Everyone gets the same test, same scoring. We can teach thousands of kids with limited resources.</p>

                <p className="mb-6 font-semibold">But we've created two problems that feed each other:</p>

                <div className="pl-6 border-l-4 border-gray-300 mb-6 space-y-4">
                  <p className="mb-4"><span className="font-semibold">First, we're teaching the wrong thing.</span> We present a world of right and wrong answers when reality is all trade-offs and uncertainty. The Apple/Siri question? That's what actual decisions look like.</p>
                  <p><span className="font-semibold">Second, we're measuring the wrong thing.</span> Even when we try to teach real skills—critical thinking, problem-solving, decision-making—we test them with bubble sheets. We look at the destination, not the journey. A kid who guessed right looks the same as one who reasoned brilliantly.</p>
                </div>

                <p className="mb-6">These aren't separate issues. They're a vicious cycle. We simplify to evaluate at scale, then we evaluate based on those simplifications, which forces us to simplify even more.</p>

                <p className="mb-6">Teachers know this. They see how students think, where they struggle, what clicks. But one teacher can only deeply evaluate so many students. The system forces them to fall back on standardized tests.</p>

                <p className="mb-6 font-semibold">What if AI could amplify what great teachers already do? Not replace them—supercharge them.</p>

                <p className="mb-6">Imagine a teacher assigns the Apple/Siri dilemma. Students write their analysis. AI helps the teacher see every student's reasoning process—where they considered trade-offs, how they handled uncertainty, what frameworks they applied. The teacher can now guide thirty students as deeply as they used to guide three.</p>

                <p className="mb-8">We could teach real-world complexity AND evaluate it fairly. Students could grapple with messy questions. Teachers could actually teach thinking, not just answers.</p>

                <p className="font-semibold">The tools to break the cycle might finally be here. The question is: are we ready to admit that the most important skills don't have right or wrong answers?</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}