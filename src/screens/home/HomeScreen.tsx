// screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    FlatList,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import {
    RESPONSIVE_SCREEN_HEIGHT,
    RESPONSIVE_SCREEN_WIDTH,
    SPACE_LARGE,
    SPACE_MEDIUM,
    SPACE_SMALL,
    wp,
} from '../../utils/getResponsiveSize';
import Colours from '../../consts/Colours';
import { fetchWeather, validateCity } from './utils/weatherUtils';

const HomeScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
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

    const renderForecastItem = ({ item }: any) => {
        return (
            <View style={styles.forecastItem}>
                <Text style={styles.foreCast}>{item.time.split(' ')[1]}</Text>
                <Text style={styles.foreCast}>{item.temp_c}°C</Text>
                <Image
                    style={styles.forecastIcon}
                    source={{ uri: `https:${item.condition.icon}` }}
                />

                <Text style={styles.condition}>{item.condition.text}</Text>
            </View>
        );
    };

    return (
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
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {loading ? <ActivityIndicator size="large" color={Colours.PRIMARY} /> : null}
            {weather && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.cityCountry}>
                        {weather?.location?.name}, {weather?.location?.country}
                    </Text>
                    <Text style={styles.weatherCondition}>{weather?.current?.condition?.text}</Text>
                    <Image
                        style={styles.weatherIcon}
                        source={{ uri: `https:${weather?.current?.condition?.icon}` }}
                    />
                    <Text style={styles.forecastHeader}>Forecast for the next 5 hours:</Text>
                    <FlatList
                        data={weather?.forecast?.forecastday?.[0]?.hour?.slice(0, 5)}
                        keyExtractor={(item) => item?.time}
                        renderItem={renderForecastItem}
                    />
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACE_MEDIUM,
        width: RESPONSIVE_SCREEN_WIDTH,
        height: RESPONSIVE_SCREEN_HEIGHT,
        alignSelf: 'center',
    },
    input: {
        height: wp(40),
        borderColor: Colours.PRIMARY,
        borderWidth: 1,
        marginBottom: SPACE_SMALL,
        paddingHorizontal: SPACE_SMALL,
        borderRadius: wp(30),
        paddingLeft: SPACE_LARGE,
        color: Colours.PRIMARY,
    },
    weatherContainer: {
        marginTop: SPACE_LARGE,
        alignItems: 'center',
        backgroundColor: Colours.PRIMARY_TRANSLUCENT,
        padding: SPACE_LARGE,
        borderRadius: SPACE_MEDIUM,
    },
    cityCountry: {
        fontSize: wp(24),
        fontWeight: 'bold',
        color: Colours.PRIMARY,
    },
    error: {
        color: Colours.ERROR,
        marginBottom: 2,
    },
    weatherCondition: {
        fontSize: wp(18),
        marginVertical: SPACE_SMALL,
        color: Colours.PRIMARY,
    },
    weatherIcon: {
        width: wp(100),
        height: wp(100),
    },
    foreCast: {
        fontSize: wp(14),
        color: Colours.PRIMARY,
    },
    forecastHeader: {
        fontSize: wp(18),
        fontWeight: 'bold',
        marginTop: SPACE_LARGE,
        color: Colours.PRIMARY,
    },
    forecastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: SPACE_LARGE,
        paddingBottom: SPACE_SMALL,
        borderBottomWidth: 1,
        borderBottomColor: Colours.PRIMARY,
    },
    forecastIcon: {
        width: wp(40),
        height: wp(40),
    },
    condition: {
        color: Colours.PRIMARY,
        width: wp(100),
    },
});

export default HomeScreen;
