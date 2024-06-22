import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import * as weatherUtils from './utils/weatherUtils';

jest.mock('./utils/weatherUtils');

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display an error message for invalid city names', () => {
        const { getByPlaceholderText, getByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');
        fireEvent.changeText(input, '123');
        fireEvent(input, 'onEndEditing');

        expect(getByText('Please enter a valid city name (letters and spaces only).')).toBeTruthy();
    });

    it('should fetch and display weather data for a valid city', async () => {
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

        (weatherUtils.fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);
        (weatherUtils.validateCity as jest.Mock).mockReturnValue(true);

        const { getByPlaceholderText, getByText, queryByText, findByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');
        fireEvent.changeText(input, 'London');
        fireEvent(input, 'onEndEditing');

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        expect(await findByText('London, UK')).toBeTruthy();
        expect(getByText('Sunny')).toBeTruthy();
    });
});
