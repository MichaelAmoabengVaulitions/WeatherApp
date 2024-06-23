import React, { useState } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    SPACE_LARGE,
    SPACE_MEDIUM,
    SPACE_SMALL,
    wp,
} from '../../utils/getResponsiveSize';
import Colours from '../../consts/Colours';
import { TransformedWeather, fetchWeather, validateCity } from './utils/weatherUtils';
import WeatherCard from './components/WeatherCard';

const HomeScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<TransformedWeather | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchWeather = async () => {
        if (!validateCity(city)) {
            setError('Please enter a valid city name (letters and spaces only).');
            return;
        }
        setError('');
        try {
            setLoading(true);
            const weatherData = await fetchWeather(city);
            setWeather(weatherData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImageBackground
                style={styles.container}
                source={require('../../../assets/background.jpg')}
                blurRadius={5}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter City"
                    placeholderTextColor={Colours.PRIMARY}
                    value={city}
                    onChangeText={(text) => {
                        setCity(text);
                        setError('');
                    }}
                    onEndEditing={handleFetchWeather}
                    keyboardType="default"
                    returnKeyType="done"
                    autoCorrect={false}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loading ? <ActivityIndicator size="large" color={Colours.PRIMARY} /> : null}
                {!!weather && (
                    <WeatherCard
                        name={weather.name}
                        country={weather.country}
                        currentConditionIcon={weather.currentConditionIcon}
                        currentConditionText={weather.currentConditionText}
                        fiveDayForecast={weather.fiveDayForecast}
                    />
                )}
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACE_MEDIUM,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignSelf: 'center',
    },
    input: {
        height: wp(40),
        width: '85%',
        alignSelf: 'center',
        borderColor: Colours.PRIMARY,
        borderWidth: 1,
        marginBottom: SPACE_SMALL,
        paddingHorizontal: SPACE_SMALL,
        borderRadius: wp(30),
        paddingLeft: SPACE_LARGE,
        color: Colours.PRIMARY,
    },
    error: {
        color: Colours.ERROR,
        marginBottom: 2,
    },
});

export default HomeScreen;
