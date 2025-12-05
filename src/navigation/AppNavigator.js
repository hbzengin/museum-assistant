import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';
import HomeScreen from '../screens/HomeScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import VoiceScreen from '../screens/VoiceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isConfigured, loading } = useContext(PreferencesContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {isConfigured ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Voice"
                        component={VoiceScreen}
                        options={{
                            title: 'Guide',
                            headerStyle: { backgroundColor: '#000' },
                            headerTintColor: '#fff',
                        }}
                    />
                </>
            ) : (
                <Stack.Screen
                    name="Preferences"
                    component={PreferencesScreen}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
