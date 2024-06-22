import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL } from '@env';

export const fetchWeather = async (city: string, hours: number = 5) => {
    const response = await axios.get(
        `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}&hours=${hours}`,
    );
    return response.data;
};

export const validateCity = (city: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
