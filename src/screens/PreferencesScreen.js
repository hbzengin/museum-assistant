import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';

const PERSONAS = [
    {
        id: 'Scholar',
        title: 'Scholar',
        description: 'Deep dives into history, technique, and academic context.',
        icon: '🎓'
    },
    {
        id: 'Creative',
        title: 'Creative',
        description: 'Focus on artistic style, inspiration, and emotional impact.',
        icon: '🎨'
    },
    {
        id: 'For Kids',
        title: 'For Kids',
        description: 'Fun, simple explanations with stories and games.',
        icon: '🎈'
    },
    {
        id: 'Informative',
        title: 'Informative',
        description: 'Clear facts, dates, and essential information.',
        icon: 'ℹ️'
    },
    {
        id: 'Conversational',
        title: 'Conversational',
        description: 'Casual and friendly, like visiting with a friend.',
        icon: '💬'
    }
];

const PreferencesScreen = () => {
    const { preferences, savePreferences } = useContext(PreferencesContext);
    const [selectedPersona, setSelectedPersona] = useState(preferences.persona || 'Conversational');

    const handleSave = () => {
        savePreferences({
            persona: selectedPersona,
            isConfigured: true
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose Your Guide</Text>
                <Text style={styles.subtitle}>Select a persona for your museum companion.</Text>
            </View>

            <View style={styles.list}>
                {PERSONAS.map((persona) => (
                    <TouchableOpacity
                        key={persona.id}
                        style={[
                            styles.card,
                            selectedPersona === persona.id && styles.selectedCard
                        ]}
                        onPress={() => setSelectedPersona(persona.id)}
                    >
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>{persona.icon}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[
                                styles.cardTitle,
                                selectedPersona === persona.id && styles.selectedText
                            ]}>{persona.title}</Text>
                            <Text style={[
                                styles.cardDescription,
                                selectedPersona === persona.id && styles.selectedText
                            ]}>{persona.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>Start Exploring</Text>
            </TouchableOpacity>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    list: {
        gap: 15,
        marginBottom: 30,
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        borderWidth: 2,
        borderColor: 'transparent',
        alignItems: 'center',
    },
    selectedCard: {
        borderColor: '#007AFF',
        backgroundColor: '#F0F7FF',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        fontSize: 24,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    selectedText: {
        color: '#007AFF',
    },
    saveButton: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PreferencesScreen;
