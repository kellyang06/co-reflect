import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint for generating reflection prompts
app.post('/api/generate-prompt', async (req, res) => {
  try {
    const { entry, mood, emoji } = req.body;

    if (!entry || !mood) {
      return res.status(400).json({ error: 'Entry and mood are required' });
    }

    const prompt = `You are a compassionate AI assistant helping someone reflect on their journal entry. 
    
    The person wrote: "${entry}"
    Their current mood is: ${mood} ${emoji}
    
    Generate a thoughtful, empathetic follow-up question that encourages deeper reflection. The question should be:
    - Warm and validating of their feelings
    - Specific to their mood and the content they shared
    - Open-ended to encourage exploration
    - Focus on personal growth, self-understanding, or actionable insights
    - Written in a conversational, caring tone
    - No more than 2-3 sentences
    - Avoid generic advice - make it personal to their situation
    
    Respond with only the question, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI assistant that helps people reflect on their thoughts and feelings through gentle, thoughtful questions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const generatedPrompt = completion.choices[0].message.content.trim();
    
    res.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Co-Reflect API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 