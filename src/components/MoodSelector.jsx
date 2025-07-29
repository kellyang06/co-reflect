import React from 'react';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { emoji: '😊', name: 'Happy', color: 'bg-yellow-100 border-yellow-300' },
    { emoji: '😌', name: 'Calm', color: 'bg-blue-100 border-blue-300' },
    { emoji: '😔', name: 'Sad', color: 'bg-gray-100 border-gray-300' },
    { emoji: '😤', name: 'Frustrated', color: 'bg-red-100 border-red-300' },
    { emoji: '🤔', name: 'Thoughtful', color: 'bg-purple-100 border-purple-300' },
    { emoji: '😴', name: 'Tired', color: 'bg-indigo-100 border-indigo-300' },
    { emoji: '😃', name: 'Excited', color: 'bg-orange-100 border-orange-300' },
    { emoji: '😌', name: 'Grateful', color: 'bg-green-100 border-green-300' },
  ];

  return (
    <div className="journal-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onMoodSelect(mood)}
            className={`mood-option p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMood?.name === mood.name
                ? `${mood.color} border-4 border-blue-500 scale-110 shadow-lg`
                : `${mood.color} border-2 border-gray-200 hover:scale-105 hover:border-gray-300`
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-gray-700">{mood.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 