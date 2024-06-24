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

export const fetchWeather = async (city: string): Promise<WeatherData | null | undefined> => {
    try {
        const response = await axios.get<WeatherData>(
            `${API_URL}?key=${API_KEY}&q=${city}&days=2`, // Request 2 days to cover cross-day scenario
        );

        if (!response?.data) return null;

        const { location, current, forecast } = response?.data;

        return {
            location,
            current,
            forecast,
        };
    } catch (error) {
        console.log('Error getting weather data', error);
    }
};

export const validateCity = (city: string): boolean => {
    const regex: RegExp = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
