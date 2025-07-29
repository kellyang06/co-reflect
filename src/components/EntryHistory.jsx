import React from 'react';

const EntryHistory = ({ entries, onEntryClick }) => {
  if (entries.length === 0) {
    return (
      <div className="journal-card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reflection Journey</h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-600">No entries yet. Start your reflection journey today!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-card p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reflection Journey</h2>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            onClick={() => onEntryClick(entry)}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{entry.mood.emoji}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">{entry.mood.name}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {entry.content.length > 100 
                      ? `${entry.content.substring(0, 100)}...` 
                      : entry.content
                    }
                  </p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-blue-500 text-sm">View →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryHistory; 