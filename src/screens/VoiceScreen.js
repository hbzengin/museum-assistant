import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';
import { HathoraService } from '../services/HathoraService';
import { MuseumService } from '../services/MuseumService';

const VoiceScreen = () => {
    const { preferences } = useContext(PreferencesContext);
    const [status, setStatus] = useState('Idle');
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [currentExhibit, setCurrentExhibit] = useState(null);

    useEffect(() => {
        startInteraction();
        return () => { };
    }, []);

    const startInteraction = async () => {
        try {
            setStatus('Listening...');
            setIsListening(true);
            // Simulate recording delay
            setTimeout(async () => {
                await stopInteraction();
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus('Error');
        }
    };

    const stopInteraction = async () => {
        try {
            setIsListening(false);
            setStatus('Processing...');

            // 1. STT (Simulated audio URI for now)
            // In a real app, this would be the path to the recorded file
            const sttResult = await HathoraService.transcribeAudio('mock-audio-uri');

            // Fallback for mock if STT fails or returns mock text
            const userText = sttResult.text || "Tell me about this painting";
            setTranscript(userText);

            // 2. Identify Context (Museum Object)
            // Simple keyword matching against dummy data
            const searchResults = await MuseumService.searchExhibits(userText);
            const matchedExhibit = searchResults.length > 0 ? searchResults[0] : null;
            setCurrentExhibit(matchedExhibit);

            // 3. Construct LLM Prompt
            const messages = [
                {
                    role: "system",
                    content: `You are a museum guide with the persona: ${preferences.persona}. 
          ${matchedExhibit ? `The user is looking at: ${matchedExhibit.title} by ${matchedExhibit.artistDisplayName}. Description: ${matchedExhibit.description}` : "The user is asking a general question."}
          Keep your response concise and spoken-style.`
                },
                { role: "user", content: userText }
            ];

            // 4. LLM
            const llmResult = await HathoraService.generateResponse(messages, preferences.persona);
            const aiText = llmResult.choices[0].message.content;
            setResponse(aiText);

            // 5. TTS
            setStatus('Speaking...');
            await HathoraService.synthesizeSpeech(aiText);

            setStatus('Idle');
        } catch (error) {
            console.error(error);
            setStatus('Error');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.visualizer}>
                <Text style={styles.statusText}>{status}</Text>
                <View style={[styles.waveformPlaceholder, isListening && styles.activeWaveform]} />

                {transcript ? (
                    <Text style={styles.transcriptText}>You: "{transcript}"</Text>
                ) : null}

                {response ? (
                    <Text style={styles.responseText}>AI: "{response}"</Text>
                ) : null}

                {currentExhibit && (
                    <View style={styles.exhibitCard}>
                        <Text style={styles.exhibitTitle}>Context: {currentExhibit.title}</Text>
                        <Text style={styles.exhibitArtist}>{currentExhibit.artistDisplayName}</Text>
                    </View>
                )}
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={status === 'Idle' ? startInteraction : stopInteraction}
                >
                    <Text style={styles.actionButtonText}>
                        {status === 'Idle' ? 'Talk Again' : 'Stop'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    visualizer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    statusText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    waveformPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#333',
        marginBottom: 30,
    },
    activeWaveform: {
        backgroundColor: '#FF3B30',
        transform: [{ scale: 1.2 }],
    },
    transcriptText: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    responseText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    exhibitCard: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    exhibitTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exhibitArtist: {
        color: '#aaa',
        fontSize: 14,
    },
    controls: {
        padding: 30,
        width: '100%',
        alignItems: 'center',
    },
    actionButton: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#007AFF',
        borderRadius: 30,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default VoiceScreen;
