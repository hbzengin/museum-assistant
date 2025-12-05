// Service to interact with Hathora AI Models
// Endpoints provided by user

const HATHORA_API_KEY = 'YOUR_HATHORA_API_KEY'; // Replace with actual key or load from env

const ENDPOINTS = {
    STT: "https://app-1c7bebb9-6977-4101-9619-833b251b86d1.app.hathora.dev/v1/audio/transcriptions", // Standard OpenAI format usually
    LLM: "https://app-362f7ca1-6975-4e18-a605-ab202bf2c315.app.hathora.dev/v1/chat/completions",
    TTS: "https://app-01312daf-6e53-4b9d-a4ad-13039f35adc4.app.hathora.dev/synthesize"
};

export const HathoraService = {
    // Transcribe audio (STT)
    transcribeAudio: async (audioUri) => {
        console.log('Hathora STT: Transcribing', audioUri);

        if (!HATHORA_API_KEY || HATHORA_API_KEY === 'YOUR_HATHORA_API_KEY') {
            console.warn('Hathora API Key missing. Returning mock transcript.');
            return { text: "This is a mock transcript. Please set your API Key." };
        }

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: audioUri,
                type: 'audio/wav', // Adjust based on actual recording format
                name: 'audio.wav',
            });
            formData.append('model', 'nvidia/parakeet-tdt-0.6b-v3');

            const response = await fetch(ENDPOINTS.STT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HATHORA_API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Hathora STT Error:', error);
            throw error;
        }
    },

    // Generate response (LLM)
    generateResponse: async (messages, persona) => {
        console.log('Hathora LLM: Generating response for persona', persona);

        if (!HATHORA_API_KEY || HATHORA_API_KEY === 'YOUR_HATHORA_API_KEY') {
            console.warn('Hathora API Key missing. Returning mock response.');
            return {
                choices: [{ message: { content: `[Mock ${persona}] That is a fascinating question! Let me tell you more.` } }]
            };
        }

        try {
            const response = await fetch(ENDPOINTS.LLM, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HATHORA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "Qwen/Qwen3-30B-A3B", // Using the model from the prompt
                    messages: messages,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Hathora LLM Error:', error);
            throw error;
        }
    },

    // Synthesize speech (TTS)
    synthesizeSpeech: async (text) => {
        console.log('Hathora TTS: Synthesizing', text);

        if (!HATHORA_API_KEY || HATHORA_API_KEY === 'YOUR_HATHORA_API_KEY') {
            console.warn('Hathora API Key missing. Returning mock audio.');
            return null; // Return null to indicate no audio to play
        }

        try {
            const response = await fetch(ENDPOINTS.TTS, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HATHORA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    model: "hexgrad/Kokoro-82M", // Using the model from the prompt
                    voice: "af_bella", // Example voice, might need adjustment
                }),
            });

            // Assuming the response is an audio blob or file
            // For React Native, we might need to save this to a file to play it
            // For now, we'll return the blob or URL if possible
            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error('Hathora TTS Error:', error);
            throw error;
        }
    }
};
