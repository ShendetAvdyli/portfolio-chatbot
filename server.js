require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

async function fetchBotResponse(message) {
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.OPENAI_API_KEY;  
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
            console.error('OpenAI API Error:', result.error);
            throw new Error('Failed to fetch response from OpenAI');
        }

        if (result.choices && result.choices[0]) {
            return result.choices[0].message.content;
        } else {
            throw new Error('Invalid response format from OpenAI');
        }
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw new Error('Error connecting to OpenAI API');
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const botResponse = await fetchBotResponse(userMessage);
        res.json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
