// utils/weatherUtils.ts
import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Condition {
    text: string;
    icon: string;
}

export interface Forecast {
    time: string;
    temp_c: number;
    condition: Condition;
    time_epoch: number;
}

export interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        condition: Condition;
        temp_c: number;
    };
    forecast: {
        forecastday: {
            date: string;
            day: {
                avgtemp_c: number;
                condition: Condition;
            };
            hour: Forecast[];
        }[];
    };
}

export interface TransformedWeather {
    name: string;
    country: string;
    currentConditionIcon: string;
    currentConditionText: string;
    fiveDayForecast: Forecast[];
}

export const fetchWeather = async (city: string, days: number = 5): Promise<TransformedWeather> => {
    try {
        const response = await axios.get<WeatherData>(
            `${API_URL}?key=${API_KEY}&q=${city}&days=${days}`,
        );

        const { location, current, forecast } = response.data;

        const now: Date = new Date();

        // Current time in seconds since epoch
        const currentTimeEpoch: number = now.getTime() / 1000;

        // Time in 5 hours in seconds since epoch
        const fiveHoursLaterEpoch: number = currentTimeEpoch + 5 * 60 * 60;

        // Filter hourly data to include only forecasts for the next 5 hours
        const fiveHourForecast: Forecast[] = forecast.forecastday[0].hour.filter(
            (hour) => hour.time_epoch >= currentTimeEpoch && hour.time_epoch <= fiveHoursLaterEpoch,
        );

        return {
            name: location.name,
            country: location.country,
            currentConditionIcon: `https:${current.condition.icon}`,
            currentConditionText: current.condition.text,
            fiveDayForecast: fiveHourForecast,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
};

export const validateCity = (city: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
