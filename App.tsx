import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/Appavigator';

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AppNavigator />
        </>
    );
}
