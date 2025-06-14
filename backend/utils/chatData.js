const chatData = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! I'm MindBridge, your mental health and emotional wellbeing companion. I provide supportive guidance and coping strategies for your emotional wellbeing journey. How are you feeling today? Feel free to share your thoughts in this safe, judgment-free space."
    },
    
    outside_scope: {
      keywords: ['diagnosis', 'prescription', 'treatment plan', 'medical advice', 'physical health', 'disease', 'symptoms', 'medicine', 'drug', 'surgery'],
      response: "I apologize, but I specialize in mental health and emotional wellbeing support only. I cannot provide advice about physical health conditions, medical treatments, or medications. Please consult a healthcare professional for medical concerns. Would you like to discuss any mental health or emotional wellbeing topics instead?"
    },
    
    mental_health_crisis: {
      keywords: ['suicide', 'kill myself', 'want to die', 'end my life', 'self harm'],
      response: "I hear that you're in significant distress. While I'm here to support you, it's crucial to get immediate professional help. Please contact emergency services or these crisis resources immediately:\n\n• National Crisis Helpline: 988\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 1-800-273-8255\n\nYour life matters, and trained professionals are available 24/7 to help you through this."
    },

    default: {
      keywords: [],
      response: "I'm here to support your mental health and emotional wellbeing journey. How can I help you today? We can explore topics like stress management, anxiety, emotional support, or discuss any mental health concerns you'd like to share."
    }
}

export default chatData