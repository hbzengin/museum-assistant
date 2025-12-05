import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesContext } from '../context/PreferencesContext';

const HomeScreen = ({ navigation }) => {
    const { preferences, resetPreferences } = useContext(PreferencesContext);

    const getPersonaIcon = (persona) => {
        switch (persona) {
            case 'Scholar': return '🎓';
            case 'Creative': return '🎨';
            case 'For Kids': return '🎈';
            case 'Informative': return 'ℹ️';
            case 'Conversational': return '💬';
            default: return '👤';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>The Met Museum</Text>
                <Text style={styles.subtitle}>AI Guide</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Active Persona</Text>
                    <View style={styles.personaRow}>
                        <Text style={styles.personaIcon}>{getPersonaIcon(preferences.persona)}</Text>
                        <Text style={styles.personaText}>{preferences.persona}</Text>
                    </View>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.talkButton}
                        onPress={() => navigation.navigate('Voice')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.talkButtonInner}>
                            <Text style={styles.micIcon}>🎙️</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.tapText}>Tap to Ask</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.changeButton}
                    onPress={resetPreferences}
                >
                    <Text style={styles.changeButtonText}>Change Guide</Text>
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
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    statusCard: {
        position: 'absolute',
        top: 20,
        backgroundColor: '#F8F9FA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: '#E1E4E8',
    },
    statusLabel: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    personaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    personaIcon: {
        fontSize: 16,
    },
    personaText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    actionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    talkButton: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 24,
    },
    talkButtonInner: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    micIcon: {
        fontSize: 48,
    },
    tapText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '500',
    },
    footer: {
        padding: 24,
        alignItems: 'center',
    },
    changeButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    changeButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default HomeScreen;
