// utils/weatherUtils.test.ts
import { fetchWeather, validateCity } from './weatherUtils';
import axios from 'axios';

jest.mock('axios');

describe('weatherUtils', () => {
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
            const mockWeatherData = {
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
                            hour: [
                                {
                                    time: '2023-06-18 01:00',
                                    temp_c: 20,
                                    condition: {
                                        text: 'Clear',
                                        icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                                    },
                                },
                                {
                                    time: '2023-06-18 02:00',
                                    temp_c: 19,
                                    condition: {
                                        text: 'Cloudy',
                                        icon: '//cdn.weatherapi.com/weather/64x64/night/119.png',
                                    },
                                },
                            ],
                        },
                    ],
                },
            };

            (axios.get as jest.Mock).mockResolvedValue({ data: mockWeatherData });

            const data = await fetchWeather('London');
            expect(data).toEqual(mockWeatherData);
        });

        it('should throw an error for an invalid city', async () => {
            (axios.get as jest.Mock).mockRejectedValue(new Error('City not found'));

            await expect(fetchWeather('InvalidCity')).rejects.toThrow('City not found');
        });
    });
});
