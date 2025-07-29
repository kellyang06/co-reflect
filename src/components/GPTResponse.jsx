import React from 'react';

const GPTResponse = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="journal-card p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Generating a thoughtful reflection prompt...</span>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="journal-card p-6 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Reflection Prompt</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">{response}</p>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            💡 Take a moment to consider this question and how it relates to your thoughts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GPTResponse; 