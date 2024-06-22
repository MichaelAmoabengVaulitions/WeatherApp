import axios from 'axios';

export const fetchWeather = async (city: string, hours: number = 5) => {
    const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${city}&hours=${hours}`,
    );
    return response.data;
};

export const validateCity = (city: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return city.length > 0 && regex.test(city);
};
