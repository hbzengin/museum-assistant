import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({
        persona: 'Conversational', // Default persona
    });
    const [isConfigured, setIsConfigured] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const storedPreferences = await AsyncStorage.getItem('userPreferences');
            if (storedPreferences) {
                const parsed = JSON.parse(storedPreferences);
                setPreferences(parsed);
                if (parsed.isConfigured) {
                    setIsConfigured(true);
                }
            }
        } catch (error) {
            console.error('Failed to load preferences', error);
        } finally {
            setLoading(false);
        }
    };

    const savePreferences = async (newPreferences) => {
        try {
            const updatedPreferences = { ...preferences, ...newPreferences };
            setPreferences(updatedPreferences);
            if (updatedPreferences.isConfigured) {
                setIsConfigured(true);
            }
            await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
        } catch (error) {
            console.error('Failed to save preferences', error);
        }
    };

    const resetPreferences = async () => {
        try {
            await AsyncStorage.removeItem('userPreferences');
            setPreferences({ persona: 'Conversational' });
            setIsConfigured(false);
        } catch (error) {
            console.error('Failed to reset preferences', error);
        }
    };

    const updatePreferences = (newPreferences) => {
        setPreferences(prev => ({ ...prev, ...newPreferences }));
    };

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences, savePreferences, resetPreferences, loading, isConfigured }}>
            {children}
        </PreferencesContext.Provider>
    );
};
