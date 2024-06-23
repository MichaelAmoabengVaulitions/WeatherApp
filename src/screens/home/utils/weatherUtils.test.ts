// utils/weatherUtils.test.ts
import { fetchWeather, validateCity, TransformedWeather, WeatherData } from './weatherUtils';
import axios from 'axios';

jest.mock('axios');

describe('weatherUtils', () => {
    beforeAll(() => {
        process.env.EXPO_PUBLIC_API_KEY = 'test_api_key';
        process.env.EXPO_PUBLIC_API_URL = 'http://api.weatherapi.com/v1/forecast.json';
    });

    describe('validateCity', () => {
        it('should return true for valid city names', () => {
            expect(validateCity('New York')).toBe(true);
            expect(validateCity('Los Angeles')).toBe(true);
            expect(validateCity('San Francisco')).toBe(true);
        });

        it('should return false for invalid city names', () => {
            expect(validateCity('')).toBe(false);
            expect(validateCity('New York123')).toBe(false);
            expect(validateCity('!@#')).toBe(false);
        });
    });

    describe('fetchWeather', () => {
        it('should fetch weather data for a valid city', async () => {
            const mockWeatherData: WeatherData = {
                location: {
                    name: 'London',
                    country: 'UK',
                },
                current: {
                    condition: {
                        text: 'Sunny',
                        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                    },
                    temp_c: 25,
                },
                forecast: {
                    forecastday: [
                        {
                            date: '2024-06-27',
                            day: {
                                avgtemp_c: 20,
                                condition: {
                                    text: 'Sunny',
                                    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                                },
                            },
                            hour: [
                                {
                                    time_epoch: 1719442800,
                                    time: '2024-06-27 01:00',
                                    temp_c: 20.9,
                                    condition: {
                                        text: 'Partly Cloudy',
                                        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
                                    },
                                },
                                {
                                    time_epoch: 1719446400,
                                    time: '2024-06-27 02:00',
                                    temp_c: 21.0,
                                    condition: {
                                        text: 'Clear',
                                        icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                                    },
                                },
                                // Add more hourly data as needed...
                            ],
                        },
                    ],
                },
            };

            (axios.get as jest.Mock).mockResolvedValue({ data: mockWeatherData });

            const currentTime = new Date('2024-06-27T00:30:00Z').getTime(); // Adjusted current time
            jest.spyOn(Date, 'now').mockImplementation(() => currentTime);

            const data: TransformedWeather | null = await fetchWeather('London');

            expect(data).toEqual({
                name: 'London',
                country: 'UK',
                currentConditionIcon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
                currentConditionText: 'Sunny',
                fiveHourForecast: [
                    {
                        time_epoch: 1719442800,
                        time: '2024-06-27 01:00',
                        temp_c: 20.9,
                        condition: {
                            text: 'Partly Cloudy',
                            icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
                        },
                    },
                    {
                        time_epoch: 1719446400,
                        time: '2024-06-27 02:00',
                        temp_c: 21.0,
                        condition: {
                            text: 'Clear',
                            icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                        },
                    },
                    // Add more expected hourly data as needed...
                ],
            });
        });

        it('should return null if there is no forecast for the next five hours', async () => {
            const mockWeatherData: WeatherData = {
                location: {
                    name: 'London',
                    country: 'UK',
                },
                current: {
                    condition: {
                        text: 'Sunny',
                        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                    },
                    temp_c: 25,
                },
                forecast: {
                    forecastday: [
                        {
                            date: '2024-06-27',
                            day: {
                                avgtemp_c: 20,
                                condition: {
                                    text: 'Sunny',
                                    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                                },
                            },
                            hour: [
                                {
                                    time_epoch: 1719500000, // Future time outside the next five hours
                                    time: '2024-06-27 10:00',
                                    temp_c: 25.0,
                                    condition: {
                                        text: 'Sunny',
                                        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                                    },
                                },
                            ],
                        },
                    ],
                },
            };

            (axios.get as jest.Mock).mockResolvedValue({ data: mockWeatherData });

            const currentTime = new Date('2024-06-27T00:30:00Z').getTime(); // Adjusted current time
            jest.spyOn(Date, 'now').mockImplementation(() => currentTime);

            const data: TransformedWeather | null = await fetchWeather('London');

            expect(data).toBeNull();
        });

        it('should throw an error for an invalid city', async () => {
            (axios.get as jest.Mock).mockRejectedValue(new Error('City not found'));

            await expect(fetchWeather('InvalidCity')).rejects.toThrow(
                'Failed to fetch weather data',
            );
        });
    });
});
