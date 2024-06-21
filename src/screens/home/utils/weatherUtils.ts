// utils/weatherUtils.ts
import axios from 'axios';

const API_KEY = '51cce2f12b27450caf3140359242006'; // Replace with your WeatherAPI key

export const fetchWeather = async (city: string) => {
    const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&hours=5`,
    );
    return response.data;
};

export const validateCity = (city: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
