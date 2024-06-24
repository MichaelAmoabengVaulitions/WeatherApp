// utils/weatherUtils.ts
import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Condition {
    text: string;
    icon: string;
}

export interface Forecast {
    time_epoch: number;
    time: string;
    temp_c: number;
    condition: Condition;
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
    fiveHourForecast?: Forecast[];
}

export const fetchWeather = async (city: string, days: number = 2): Promise<TransformedWeather> => {
    try {
        const response = await axios.get<WeatherData>(
            `${API_URL}?key=${API_KEY}&q=${city}&days=${days}`,
        );

        const { location, current, forecast } = response.data;
        const now = new Date();
        const currentTimeEpoch = now.getTime();
        const fiveHoursLaterEpoch = currentTimeEpoch + 5 * 60 * 60 * 1000;

        const hourlyData = [
            ...forecast?.forecastday?.[0]?.hour,
            ...forecast?.forecastday?.[1]?.hour,
        ];

        const fiveHourForecast = hourlyData?.filter(
            (hour) =>
                new Date(hour.time).getTime() >= currentTimeEpoch &&
                new Date(hour.time).getTime() <= fiveHoursLaterEpoch,
        );

        return {
            name: location?.name,
            country: location?.country,
            currentConditionIcon: `https:${current?.condition?.icon}`,
            currentConditionText: current.condition.text,
            fiveHourForecast: fiveHourForecast ?? [],
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
};

export const validateCity = (city: string): boolean => {
    const regex: RegExp = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
