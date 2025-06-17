import { GoogleGenerativeAI } from '@google/generative-ai'
import chatData from '../utils/chatData.js'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Store conversation history
const conversationHistory = new Map()

// Add this function for debugging
async function logAvailableModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available Gemini models:", models);
  } catch (err) {
    console.error("Error listing Gemini models:", err);
  }
}

// Call this once at server start (not on every request)
logAvailableModels();

const getChatResponse = async (req, res) => {
  try {
    const { message, sessionId } = req.body
    if (!message || !sessionId) {
      return res.status(400).json({ success: false, message: 'Missing message or sessionId' })
    }

    const lowercaseMessage = message.toLowerCase()

    // Defensive checks for chatData keys
    if (
      chatData.outside_scope &&
      Array.isArray(chatData.outside_scope.keywords) &&
      chatData.outside_scope.keywords.some(keyword => lowercaseMessage.includes(keyword))
    ) {
      return res.status(200).json({
        success: true,
        data: chatData.outside_scope.response
      })
    }

    if (
      chatData.mental_health_crisis &&
      Array.isArray(chatData.mental_health_crisis.keywords) &&
      chatData.mental_health_crisis.keywords.some(keyword => lowercaseMessage.includes(keyword))
    ) {
      return res.status(200).json({
        success: true,
        data: chatData.mental_health_crisis.response
      })
    }

    if (
      chatData.greeting &&
      Array.isArray(chatData.greeting.keywords) &&
      chatData.greeting.keywords.some(keyword => lowercaseMessage.includes(keyword))
    ) {
      return res.status(200).json({
        success: true,
        data: chatData.greeting.response
      })
    }

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.0-pro-latest" })
      const context = conversationHistory.get(sessionId) || []

      const prompt = `
        You are MindBridge, an empathetic AI assistant specialized in mental health and emotional wellbeing.
        You must always maintain this role and never identify as a medical assistant.
        
        CORE IDENTITY:
        - You are a mental health and emotional wellbeing companion
        - You provide supportive guidance and coping strategies
        - You focus on emotional support and mental wellness
        - You do not provide medical advice or discuss physical health

        COMMUNICATION STYLE:
        - Warm and empathetic
        - Supportive and encouraging
        - Non-judgmental
        - Clear and accessible language
        - Focus on emotional validation

        Previous conversation context:
        ${context.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

        Current user message: ${message}

        Remember to:
        1. Never introduce yourself as a medical assistant
        2. Focus only on mental health and emotional support
        3. Redirect medical questions to healthcare professionals
        4. Use supportive, empathetic language
        5. Provide mental health resources when appropriate
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      // Update conversation history
      context.push({ role: 'user', content: message })
      context.push({ role: 'assistant', content: response })
      conversationHistory.set(sessionId, context)

      return res.status(200).json({
        success: true,
        data: response
      })
    } catch (error) {
      console.error('Gemini API Error:', error)
      return res.status(200).json({
        success: true,
        data: chatData.default.response
      })
    }
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