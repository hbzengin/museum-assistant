import { API_KEY } from '@env';

// Endpoints for specific models based on user request and standard Hathora/OpenAI-compatible paths
const ENDPOINTS = {
    STT: "https://app-1c7bebb9-6977-4101-9619-833b251b86d1.app.hathora.dev/v1/transcribe",
    TTS: "https://app-efbc8fe2-df55-4f96-bbe3-74f6ea9d986b.app.hathora.dev/v1/generate"
};

export const HathoraService = {
    // Transcribe audio (STT) - Parakeet
    transcribeAudio: async (audioUri) => {
        console.log('Hathora STT: Transcribing with Parakeet', audioUri);

        if (!API_KEY) {
            console.warn('Hathora API Key missing (API_KEY in .env). Returning mock transcript.');
            return { text: "This is a mock transcript. Please set API_KEY in .env." };
        }

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: audioUri,
                type: 'audio/wav', // Ensure this matches the recording format
                name: 'audio.wav',
            });
            // Model might not be needed if implied by the endpoint, but keeping if it doesn't hurt
            // The user's curl didn't show 'model' param for STT, so removing it to match curl exactly

            const response = await fetch(ENDPOINTS.STT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            console.log('STT Response:', data);
            return data;
        } catch (error) {
            console.error('Hathora STT Error:', error);
            throw error;
        }
    },

    // Synthesize speech (TTS) - ResembleAI Chatterbox
    synthesizeSpeech: async (text) => {
        console.log('Hathora TTS: Synthesizing with ResembleAI', text);

        if (!API_KEY) {
            console.warn('Hathora API Key missing. Returning mock audio.');
            return null;
        }

        try {
            // User's curl uses -F, which implies multipart/form-data
            const formData = new FormData();
            formData.append('text', text);
            formData.append('exaggeration', '0.5');
            formData.append('cfg_weight', '0.5');

            const response = await fetch(ENDPOINTS.TTS, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('TTS API Error:', errorText);
                throw new Error(`TTS Failed: ${response.status}`);
            }

            // Return the audio blob
            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error('Hathora TTS Error:', error);
            throw error;
        }
    }
};
