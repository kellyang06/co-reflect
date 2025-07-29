import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import JournalEntryForm from './components/JournalEntryForm';
import GPTResponse from './components/GPTResponse';
import EntryHistory from './components/EntryHistory';
import { saveEntry, getEntries, generateReflectionPrompt } from './services/journalService';

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [entries, setEntries] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = getEntries();
    setEntries(savedEntries);
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentResponse(''); // Clear previous response when mood changes
  };

  const handleJournalSubmit = async (content) => {
    if (!selectedMood) {
      alert('Please select your mood first!');
      return;
    }

    setIsLoading(true);

    try {
      // Create new entry
      const newEntry = {
        id: Date.now().toString(),
        content,
        mood: selectedMood,
        timestamp: new Date().toISOString(),
        gptResponse: ''
      };

      // Save to localStorage
      saveEntry(newEntry);
      setEntries([newEntry, ...entries]);

      // Generate GPT response
      const gptResponse = await generateReflectionPrompt(content, selectedMood);
      
      // Update entry with GPT response
      newEntry.gptResponse = gptResponse;
      saveEntry(newEntry);
      
      setCurrentResponse(gptResponse);
      setShowContinuePrompt(true);
    } catch (error) {
      console.error('Error processing journal entry:', error);
      alert('There was an error processing your entry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueJournaling = () => {
    setShowContinuePrompt(false);
    setCurrentResponse('');
    // Keep the same mood selected for continued journaling
  };

  const handleSkipPrompt = () => {
    setShowContinuePrompt(false);
    setCurrentResponse('');
    setSelectedMood(null); // Reset mood selection
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setCurrentResponse(entry.gptResponse || '');
  };

  const closeEntryDetail = () => {
    setSelectedEntry(null);
    setCurrentResponse('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Co-Reflect</h1>
          <p className="text-gray-600">Your AI-powered journaling companion</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Journaling Interface */}
          <div className="space-y-6">
            <MoodSelector 
              selectedMood={selectedMood} 
              onMoodSelect={handleMoodSelect} 
            />
            
            <JournalEntryForm 
              onSubmit={handleJournalSubmit} 
              isLoading={isLoading} 
            />
            
            <GPTResponse 
              response={currentResponse} 
              isLoading={isLoading}
              onContinueJournaling={handleContinueJournaling}
              onSkip={handleSkipPrompt}
            />
          </div>

          {/* Right Column - Entry History */}
          <div>
            <EntryHistory 
              entries={entries} 
              onEntryClick={handleEntryClick} 
            />
          </div>
        </div>

        {/* Entry Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="journal-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{selectedEntry.mood.emoji}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {selectedEntry.mood.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedEntry.timestamp).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeEntryDetail}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>

                {selectedEntry.gptResponse && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-800 mb-2">Reflection Prompt</h4>
                    <p className="text-gray-700">{selectedEntry.gptResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
