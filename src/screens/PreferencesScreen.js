import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesContext } from '../context/PreferencesContext';

const PERSONAS = [
    { id: 'Scholar', icon: '🎓', description: 'In-depth historical context and academic analysis.' },
    { id: 'Creative', icon: '🎨', description: 'Focus on artistic techniques, colors, and emotions.' },
    { id: 'For Kids', icon: '🎈', description: 'Fun, simple explanations with engaging stories.' },
    { id: 'Informative', icon: 'ℹ️', description: 'Clear, concise facts and highlights.' },
    { id: 'Conversational', icon: '💬', description: 'Casual, friendly chat like a local guide.' },
];

const PreferencesScreen = ({ navigation }) => {
    const { preferences, updatePreferences, savePreferences } = useContext(PreferencesContext);

    const handleSave = async () => {
        await savePreferences({ ...preferences, isConfigured: true });
        navigation.replace('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose Your Guide</Text>
                <Text style={styles.subtitle}>Select a persona to customize your tour.</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {PERSONAS.map((persona) => {
                    const isSelected = preferences.persona === persona.id;
                    return (
                        <TouchableOpacity
                            key={persona.id}
                            style={[
                                styles.card,
                                isSelected && styles.cardSelected
                            ]}
                            onPress={() => updatePreferences({ persona: persona.id })}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.icon}>{persona.icon}</Text>
                                <Text style={[
                                    styles.cardTitle,
                                    isSelected && styles.cardTitleSelected
                                ]}>
                                    {persona.id}
                                </Text>
                                {isSelected && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
                            </View>
                            <Text style={[
                                styles.cardDescription,
                                isSelected && styles.cardDescriptionSelected
                            ]}>
                                {persona.description}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>Start Exploring</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1a1a1a',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 10,
        gap: 16,
    },
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#E0E0E0', // Darker border as requested
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardSelected: {
        backgroundColor: '#F0F7FF',
        borderColor: '#007AFF',
        shadowColor: '#007AFF',
        shadowOpacity: 0.15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 24,
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    cardTitleSelected: {
        color: '#007AFF',
    },
    checkMark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        paddingLeft: 36, // Align with title
    },
    cardDescriptionSelected: {
        color: '#4A6F9E',
    },
    footer: {
        padding: 24,
        paddingTop: 20,
        backgroundColor: '#EBEBEB', // Even darker white/gray
        borderTopWidth: 1,
        borderTopColor: '#D1D1D6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default PreferencesScreen;
