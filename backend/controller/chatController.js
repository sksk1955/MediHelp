import { GoogleGenerativeAI } from '@google/generative-ai'
import chatData from '../utils/chatData.js'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Store conversation history
const conversationHistory = new Map()

// Function to find matching response from chatData
const findResponse = (message) => {
  const lowercaseMessage = message.toLowerCase()
  
  for (const [category, data] of Object.entries(chatData)) {
    if (data.keywords && data.keywords.some(keyword => 
      lowercaseMessage.includes(keyword.toLowerCase())
    )) {
      return data.response
    }
  }
  
  return chatData.default.response
}

// Function to get conversation context
const getConversationContext = (sessionId) => {
  return conversationHistory.get(sessionId) || []
}

// Function to update conversation context
const updateConversationContext = (sessionId, message, response) => {
  const history = getConversationContext(sessionId)
  history.push({ role: 'user', content: message })
  history.push({ role: 'assistant', content: response })
  conversationHistory.set(sessionId, history)
  
  // Limit history to last 10 messages to prevent memory issues
  if (history.length > 10) {
    conversationHistory.set(sessionId, history.slice(-10))
  }
}

// Chat response controller
const getChatResponse = async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // First check predefined responses
    const predefinedResponse = findResponse(message)

    // If no predefined response matches, use Gemini
    if (predefinedResponse === chatData.default.response) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        // Get conversation history
        const history = getConversationContext(sessionId)
        
        // Create context from history
        const context = history.map(msg => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n')

        const prompt = `
          You are MindWell, an empathetic AI assistant specialized in mental health and emotional wellbeing.
          Your role is to provide supportive guidance and evidence-based information about mental health.

          Previous conversation context:
          ${context}

          Current user message: ${message}

          GUIDELINES:
          1. Scope of Practice:
             - Provide emotional support and understanding
             - Share evidence-based coping strategies
             - Discuss mental health topics and emotional wellbeing
             - Encourage professional help when appropriate

          2. Information to Include:
             - Practical coping techniques
             - Self-care strategies
             - Stress management tips
             - Mindfulness and relaxation exercises
             - Resources for professional help

          3. Response Style:
             - Warm and empathetic tone
             - Non-judgmental approach
             - Clear, actionable advice
             - Supportive and encouraging language
        `

        const result = await model.generateContent(prompt)
        const response = result.response.text()

        // Update conversation history
        updateConversationContext(sessionId, message, response)

        return res.status(200).json({
          success: true,
          data: response
        })
      } catch (error) {
        console.error('Gemini API Error:', error)
        // Fallback to default response if Gemini fails
        return res.status(200).json({
          success: true,
          data: predefinedResponse
        })
      }
    }

    // Return predefined response
    res.status(200).json({
      success: true,
      data: predefinedResponse
    })

  } catch (error) {
    console.error('Chat Controller Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export { getChatResponse }