import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PreferencesProvider } from './src/context/PreferencesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <PreferencesProvider>
                <NavigationContainer>
                    <AppNavigator />
                    <StatusBar style="auto" />
                </NavigationContainer>
            </PreferencesProvider>
        </SafeAreaProvider>
    );
}
