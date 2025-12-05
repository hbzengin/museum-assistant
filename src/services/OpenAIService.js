import { OPENAI_KEY } from '@env';

export const OpenAIService = {
    generateResponse: async (messages) => {
        console.log('OpenAI: Generating response...');

        if (!OPENAI_KEY) {
            console.warn('OpenAI Key missing. Returning mock response.');
            return "I'm sorry, I can't connect to my brain right now. Please check your API key.";
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: messages,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();

            if (data.error) {
                console.error('OpenAI API Error:', data.error);
                throw new Error(data.error.message);
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI Service Error:', error);
            throw error;
        }
    }
};
