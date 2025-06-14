const chatData = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! I'm MindBridge, your mental health and emotional wellbeing assistant. I'm here to provide supportive guidance, coping strategies, and resources for your mental health journey. How are you feeling today?"
    },
    
    outside_scope: {
      keywords: ['diagnosis', 'prescription', 'treatment plan', 'medical advice', 'what should i do', 'what do i have', 'physical health', 'disease', 'symptoms', 'medicine', 'drug', 'surgery'],
      response: "I apologize, but I specialize in mental health and emotional wellbeing support only. I cannot provide advice about physical health conditions, medical treatments, or medications. Please consult a healthcare professional for medical concerns. Would you like to discuss any mental health or emotional wellbeing topics instead?"
    },
    
    mental_health_crisis: {
      keywords: ['suicide', 'kill myself', 'want to die', 'end my life', 'self harm'],
      response: "I hear that you're in significant distress. While I'm here to support you, it's crucial to get immediate professional help. Please contact emergency services or these crisis resources immediately:\n\n• National Crisis Helpline: 988\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 1-800-273-8255\n\nYour life matters, and trained professionals are available 24/7 to help you through this."
    },

    irrelevant: {
      keywords: ['weather', 'sports', 'movies', 'food', 'recipes', 'shopping', 'games', 'politics'],
      response: "I apologize, but I'm specifically designed to discuss mental health and emotional wellbeing topics. I cannot assist with questions about other subjects. Would you like to explore topics related to mental health, stress management, emotional support, or personal growth instead?"
    },

    default: {
      keywords: [],
      response: "I'm here to support your mental health and emotional wellbeing journey. I can help you understand various aspects of mental health, suggest coping strategies, or discuss emotional challenges you might be facing. What specific area of your mental wellbeing would you like to explore?"
    }
  }
  
export default chatData