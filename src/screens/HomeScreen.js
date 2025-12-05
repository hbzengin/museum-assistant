import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesContext } from '../context/PreferencesContext';

const HomeScreen = ({ navigation }) => {
    const { preferences, resetPreferences } = useContext(PreferencesContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>The Met Museum</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    I'm ready to help you explore.
                </Text>
                <Text style={styles.modeText}>
                    Current Mode: {preferences.persona}
                </Text>

                <TouchableOpacity
                    style={styles.talkButton}
                    onPress={() => navigation.navigate('Voice')}
                >
                    <Text style={styles.talkButtonText}>TALK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetPreferences}
                >
                    <Text style={styles.resetButtonText}>Change Guide</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    modeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 40,
    },
    talkButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    talkButtonText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    resetButton: {
        marginTop: 40,
        padding: 10,
    },
    resetButtonText: {
        color: '#007AFF',
        fontSize: 14,
    },
});

export default HomeScreen;
