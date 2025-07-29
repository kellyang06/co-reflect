import React, { useState } from 'react';

const JournalEntryForm = ({ onSubmit, isLoading }) => {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      onSubmit(entry);
      setEntry('');
    }
  };

  return (
    <div className="journal-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">What's on your mind?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write about your day, your thoughts, or anything you'd like to reflect on..."
          className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {entry.length} characters
          </span>
          <button
            type="submit"
            disabled={!entry.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Reflect & Get Insights'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm; 