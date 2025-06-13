import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Brain } from "lucide-react";

const ChatPreview = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setChatStarted(true);
      setInputValue("");
    }
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
  };

  const exampleQuestions = [
    "How can I manage anxiety?",
    "What are some stress relief techniques?",
    "How to improve my mood?",
    "Ways to practice self-care?",
    "Tips for better sleep and mental health?",
    "Dealing with work stress?"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-mindwell-light/20">
      <div className="section-container">
        <h2 className="section-title">Try MindBridge AI</h2>
        <p className="section-subtitle">
          Experience how our AI companion can support your mental wellbeing journey
        </p>

        <div className="max-w-3xl mx-auto card-shadow p-6 rounded-2xl bg-gray-50">
          <div className="bg-white rounded-xl p-4 mb-4 h-72 flex flex-col overflow-y-auto">
            {!chatStarted ? (
              <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <div className="w-16 h-16 bg-mindwell-light rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-mindwell animate-pulse-gentle" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Wellbeing Companion</h3>
                <p className="text-gray-600 mb-4">
                  Share your thoughts and feelings in a safe, judgment-free space. 
                  I'm here to listen and provide supportive guidance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className="text-left text-sm bg-white border border-gray-200 rounded-lg p-2 hover:border-mindwell transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="chat-bubble-user mb-4">
                  How can I manage anxiety?
                </div>
                <div className="chat-bubble-bot">
                  <p className="mb-2">Here are some effective strategies for managing anxiety:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practice deep breathing exercises</li>
                    <li>Try progressive muscle relaxation</li>
                    <li>Maintain a regular exercise routine</li>
                    <li>Get adequate sleep</li>
                    <li>Consider mindfulness meditation</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">
                    Remember, while these techniques can help, it's important to seek 
                    professional support if anxiety significantly impacts your daily life. 
                    Would you like to learn more about any of these strategies?
                  </p>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Share your thoughts or ask for support..."
              className="flex-grow rounded-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-mindwell/50"
            />
            <Button 
              type="submit" 
              className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-mindwell hover:bg-mindwell/90"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
