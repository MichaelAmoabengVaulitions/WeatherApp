import React, { FC } from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import {
    SCREEN_WIDTH,
    SPACE_LARGE,
    SPACE_MEDIUM,
    SPACE_SMALL,
    wp,
} from '../../../utils/getResponsiveSize';
import Colours from '../../../consts/Colours';
import ForecastItem from '../../../components/ForecastItem';
import { Forecast } from '../utils/weatherUtils';

interface WeatherCardProps {
    name: string;
    country: string;
    currentConditionIcon: string;
    currentConditionText: string;
    fiveHourForecast: Forecast[];
}

const WeatherCard: FC<WeatherCardProps> = ({
    name,
    country,
    currentConditionText,
    currentConditionIcon,
                                               fiveHourForecast,
}) => {
    const renderForecastItem = ({ item }: any) => {
        const currentHour = new Date().getHours();
        const forecastHour = new Date(item.time).getHours();
        const timeLabel = currentHour === forecastHour ? 'Now' : item.time.split(' ')[1];

        return (
            <ForecastItem
                time={timeLabel}
                temp_c={`${item?.temp_c}°C`}
                conditionIcon={`https:${item?.condition?.icon}`}
                conditionTitle={item?.condition?.text}
            />
        );
    };

    return (
        <View style={styles.weatherContainer}>
            <Text style={styles.cityCountry}>
                {name}, {country}
            </Text>
            <Text style={styles.weatherCondition}>{currentConditionText}</Text>
            <Image
                style={styles.weatherIcon}
                source={{ uri: currentConditionIcon }}
                testID="weather-icon"
            />
            <Text style={styles.forecastHeader}>Forecast for the next 5 hours</Text>

            <FlatList
                horizontal
                data={fiveHourForecast}
                keyExtractor={(item) => item?.time}
                renderItem={renderForecastItem}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        marginTop: SPACE_LARGE,
        alignItems: 'center',
        backgroundColor: Colours.PRIMARY_TRANSLUCENT,
        borderRadius: SPACE_MEDIUM,
        width: SCREEN_WIDTH - 32,
        alignSelf: 'center',
    },

    cityCountry: {
        fontSize: wp(20),
        fontWeight: 'bold',
        color: Colours.PRIMARY,
        marginTop: SPACE_MEDIUM,
    },
    error: {
        color: Colours.ERROR,
        marginBottom: 2,
    },
    weatherCondition: {
        fontSize: wp(16),
        marginVertical: SPACE_SMALL,
        color: Colours.PRIMARY,
    },
    weatherIcon: {
        width: wp(80),
        height: wp(80),
    },
    forecastHeader: {
        fontSize: wp(17),
        fontWeight: 'bold',
        color: Colours.PRIMARY,
    },
    contentContainerStyle: {
        paddingRight: SPACE_SMALL,
    },
});

export default WeatherCard;
