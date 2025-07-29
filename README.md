# Co-Reflect 🌟

A personal HCI journaling web app that uses AI to help users reflect on their emotions and thoughts. Built with React, Tailwind CSS, and OpenAI GPT API.

## Features

- **Mood Selection**: Choose your current mood with intuitive emoji-based interface
- **Journal Entry**: Write your thoughts in a beautiful, distraction-free environment
- **AI Reflection Prompts**: Receive thoughtful follow-up questions from GPT to encourage deeper reflection
- **Entry History**: View and revisit your past journal entries with timestamps and mood tracking
- **Responsive Design**: Clean, calming interface that works on all devices
- **Local Storage**: Your entries are saved locally for privacy

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-3.5-turbo API
- **Backend**: Express.js
- **Storage**: LocalStorage (with option to upgrade to Firebase)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd co-reflect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

4. **Start the development server**
   ```bash
   # Run both frontend and backend
   npm run dev:full
   
   # Or run them separately:
   # Terminal 1: Backend
   npm run server
   
   # Terminal 2: Frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Usage

1. **Select Your Mood**: Choose how you're feeling today using the emoji mood selector
2. **Write Your Entry**: Share your thoughts, feelings, or experiences in the journal form
3. **Get AI Insights**: Receive a personalized reflection prompt from GPT
4. **Review History**: Click on past entries to revisit your thoughts and AI responses

## Project Structure

```
co-reflect/
├── src/
│   ├── components/
│   │   ├── MoodSelector.jsx      # Mood selection interface
│   │   ├── JournalEntryForm.jsx  # Journal entry form
│   │   ├── GPTResponse.jsx       # AI response display
│   │   └── EntryHistory.jsx      # Past entries list
│   ├── services/
│   │   └── journalService.js     # LocalStorage and API functions
│   ├── App.jsx                   # Main application component
│   └── index.css                 # Tailwind styles
├── server.js                     # Express backend server
├── package.json
└── README.md
```

## API Endpoints

- `POST /api/generate-prompt` - Generate AI reflection prompts
- `GET /api/health` - Health check endpoint

## Customization

### Adding New Moods
Edit the `moods` array in `src/components/MoodSelector.jsx` to add new mood options.

### Styling
The app uses Tailwind CSS with custom colors defined in `tailwind.config.js`. You can modify the color scheme and styling to match your preferences.

### AI Prompts
Customize the AI prompt generation by editing the prompt template in `server.js`.

## Future Enhancements

- [ ] Firebase integration for cloud storage
- [ ] User authentication
- [ ] Mood tracking analytics
- [ ] Export functionality
- [ ] Dark mode
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for better mental health and self-reflection
