// HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView,
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
import { WeatherData, fetchWeather, validateCity } from './utils/weatherUtils';
import WeatherCard from './components/WeatherCard';
import { isIOS } from '../../utils/platForm';

const HomeScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchWeather = async (city: string) => {
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
            console.log(error);
            setLoading(false);
        }
    };

    const fiveHourForecast = useMemo(() => {
        if (!weather) return [];
        const now = new Date();
        const currentTimeEpoch = now.getTime();
        const fiveHoursLaterEpoch = currentTimeEpoch + 5 * 60 * 60 * 1000; // Time in 5 hours in milliseconds

        // Gather hourly data for the current day and the next day
        const hourlyData = [
            ...weather?.forecast?.forecastday?.[0]?.hour,
            ...weather?.forecast?.forecastday?.[1]?.hour,
        ];

        // Filter hourly data to include only forecasts for the next 5 hours
        return hourlyData?.filter(
            (hour) =>
                new Date(hour?.time).getTime() >= currentTimeEpoch &&
                new Date(hour?.time).getTime() <= fiveHoursLaterEpoch,
        );
    }, [weather]);

    return (
        <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}>
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
                    onEndEditing={() => handleFetchWeather(city)}
                    keyboardType="default"
                    returnKeyType="done"
                    autoCorrect={false}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loading ? <ActivityIndicator size="large" color={Colours.PRIMARY} /> : null}
                {!!weather && (
                    <WeatherCard
                        name={weather?.location?.name}
                        country={weather?.location?.country}
                        currentConditionIcon={`https:${weather?.current?.condition?.icon}`}
                        currentConditionText={weather?.current?.condition?.text}
                        fiveHourForecast={fiveHourForecast}
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
    keyboardAvoidingView: {
        flex: 1,
    },
});

export default HomeScreen;
