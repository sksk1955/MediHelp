import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Send, ArrowLeft, Brain, LogOut } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MoodTracker from '@/components/MoodTracker'
import CrisisResources from '@/components/CrisisResources'
import { useAuth } from "@clerk/clerk-react";

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const Chat = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { signOut } = useAuth();
  const navigate = useNavigate()

  // Generate or load session ID
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId')
    if (savedSessionId) {
      setSessionId(savedSessionId)
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15)
      setSessionId(newSessionId)
      localStorage.setItem('chatSessionId', newSessionId)
    }
  }, [])

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom of messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: userMessage,
        sessionId: sessionId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const newAssistantMessage: Message = {
          role: 'assistant',
          content: response.data.data,
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, newAssistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQuestions = [
    "How can I manage anxiety?",
    "What are some stress relief techniques?",
    "Tips for better sleep and mental health?",
    "How can I improve my mood?",
    "Ways to practice self-care?",
    "Dealing with work-related stress?"
  ];

  const handleBackClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Clear chat history and sessionId on mount
  useEffect(() => {
    setMessages([])
    localStorage.removeItem('chatHistory')
    // Optionally, clear sessionId if you want a new session each time:
    // localStorage.removeItem('chatSessionId')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBackClick}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold">Chat with MindBridge</h1>
            </div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {messages.length > 0 && (
                <Button
                  onClick={() => {
                    setMessages([]);
                    localStorage.removeItem('chatHistory');
                  }}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Clear Chat
                </Button>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-sm flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <MoodTracker />
              <CrisisResources />
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Messages Container */}
                <div className="h-[calc(100vh-280px)] overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="flex-grow flex flex-col justify-center items-center text-center px-2 sm:px-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-mindwell-light rounded-full flex items-center justify-center mb-3 sm:mb-4">
                          <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-mindwell" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Your Mental Wellbeing Companion</h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                          Share your thoughts and feelings in a safe, judgment-free space. 
                          I'm here to listen and provide supportive guidance.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                          {exampleQuestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => setInputValue(question)}
                              className="text-left text-xs sm:text-sm bg-white border border-gray-200 rounded-lg p-2 hover:border-mindwell transition-colors"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-sm sm:text-base ${
                              message.role === 'user'
                                ? 'bg-mindwell text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ node, className, children, ...props }) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return match ? (
                                    <SyntaxHighlighter
                                      style={vscDarkPlus}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-sm sm:text-base bg-gray-100 text-gray-800">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t bg-white p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Share your thoughts or ask for support..."
                      className="flex-grow px-4 py-2 rounded-full border focus:ring-2 focus:ring-mindwell/50"
                    />
                    <Button 
                      type="submit" 
                      className="rounded-full aspect-square p-2 bg-mindwell hover:bg-mindwell/90"
                      disabled={isLoading}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Chat