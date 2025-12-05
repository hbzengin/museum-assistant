// Mock AI Service for MVP
// This will be replaced by actual API calls later

export const AIService = {
    // Mock Speech-to-Text
    startRecording: async () => {
        console.log('Mock STT: Started recording');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
        });
    },

    stopRecording: async () => {
        console.log('Mock STT: Stopped recording');
        // Return a random mock query
        const queries = [
            "What is this painting?",
            "Tell me about this statue.",
            "Who is the artist?",
            "When was this made?"
        ];
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        return { text: randomQuery };
    },

    // Mock LLM Processing
    processQuery: async (text, userContext) => {
        console.log('Mock LLM: Processing', text, 'with context', userContext);
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate a mock response based on the query and user context
                let response = `I see you're asking about "${text}". `;

                if (userContext.ageGroup === 'Child') {
                    response += "It's a really cool old thing! Imagine living back then!";
                } else if (userContext.ageGroup === 'Senior') {
                    response += "It has a rich history dating back to the 18th century, reflecting the era's elegance.";
                } else {
                    response += "This is a significant piece from the collection, showcasing unique techniques.";
                }

                if (userContext.interests && userContext.interests.includes('History')) {
                    response += " Historically, it was used during important ceremonies.";
                }

                resolve({
                    text: response,
                    exhibitId: 'mock-exhibit-123'
                });
            }, 1500);
        });
    },

    // Mock Text-to-Speech
    speakResponse: async (text) => {
        console.log('Mock TTS: Speaking', text);
        return new Promise((resolve) => {
            // Simulate speech duration based on text length
            const duration = text.length * 50;
            setTimeout(() => {
                resolve({ success: true });
            }, duration);
        });
    }
};
