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
    'Happy': "What made you feel this way today? How can you carry this positive energy forward?",
    'Calm': "What helped you find this sense of peace? How can you create more moments like this?",
    'Sad': "What's weighing on your heart? What would help you feel a little better right now?",
    'Frustrated': "What's the root cause of this frustration? What's one small step you could take to address it?",
    'Thoughtful': "What insights are you gaining from this reflection? How might this change your perspective?",
    'Tired': "What drained your energy today? What would help you recharge?",
    'Excited': "What sparked this excitement? How can you channel this energy into something meaningful?",
    'Grateful': "What are you most thankful for in this moment? How does gratitude change your outlook?",
  };
  
  return prompts[mood.name] || "What would you like to explore further about your thoughts and feelings?";
}; 