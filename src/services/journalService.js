// LocalStorage operations
export const saveEntry = (entry) => {
  try {
    const entries = getEntries();
    entries.unshift(entry); // Add to beginning
    localStorage.setItem('co-reflect-entries', JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving entry:', error);
    return false;
  }
};

export const getEntries = () => {
  try {
    const entries = localStorage.getItem('co-reflect-entries');
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error getting entries:', error);
    return [];
  }
};

export const deleteEntry = (entryId) => {
  try {
    const entries = getEntries();
    const filteredEntries = entries.filter(entry => entry.id !== entryId);
    localStorage.setItem('co-reflect-entries', JSON.stringify(filteredEntries));
    return true;
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
};

// OpenAI API integration
export const generateReflectionPrompt = async (journalEntry, mood) => {
  try {
    const response = await fetch('/api/generate-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entry: journalEntry,
        mood: mood.name,
        emoji: mood.emoji
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate prompt');
    }

    const data = await response.json();
    return data.prompt;
  } catch (error) {
    console.error('Error generating prompt:', error);
    // Fallback prompts based on mood
    return getFallbackPrompt(mood);
  }
};

// Fallback prompts when API is not available
const getFallbackPrompt = (mood) => {
  const prompts = {
    'Happy': "I can sense the joy in your words! What specific moment or realization brought you this happiness today? How might you share this positive energy with someone else who might need it?",
    'Calm': "Your sense of peace is beautiful to read. What practices or thoughts helped you find this centered state? How can you remember to return to this feeling when life gets busy?",
    'Sad': "I hear the weight in your words, and it's okay to feel this way. What's the deepest source of this sadness? What small act of self-care could bring you even a moment of comfort right now?",
    'Frustrated': "I can feel your frustration, and it's completely valid. What's the underlying need or expectation that isn't being met? What's one tiny step you could take to address this situation?",
    'Thoughtful': "Your reflection shows such depth. What new understanding are you discovering about yourself or the situation? How might this insight change how you approach similar situations in the future?",
    'Tired': "I can feel the exhaustion in your words. What specifically drained your energy today? What would it look like to give yourself permission to rest and recharge?",
    'Excited': "Your enthusiasm is contagious! What sparked this excitement, and how does it connect to what matters most to you? How can you nurture this energy and channel it into something meaningful?",
    'Grateful': "Your gratitude is beautiful and powerful. What are you most thankful for in this moment, and how does this appreciation change the way you see your day? How might you express this gratitude to someone who has supported you?",
  };
  
  return prompts[mood.name] || "Your thoughts are valuable. What aspect of what you've written would you like to explore more deeply? What questions does this raise for you?";
}; 