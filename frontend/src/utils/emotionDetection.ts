export const detectEmotion = (text: string): string => {
  const emotions = {
    anxiety: ['anxious', 'worried', 'nervous', 'panic', 'stress'],
    depression: ['sad', 'hopeless', 'depressed', 'empty', 'worthless'],
    anger: ['angry', 'frustrated', 'mad', 'irritated', 'upset'],
    joy: ['happy', 'excited', 'grateful', 'peaceful', 'content'],
    fear: ['scared', 'afraid', 'terrified', 'fearful', 'frightened']
  }

  const lowercaseText = text.toLowerCase()
  
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return emotion
    }
  }

  return 'neutral'
}