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
            name: 'London',
            country: 'UK',
            currentConditionIcon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            currentConditionText: 'Sunny',
            fiveHourForecast: [
                {
                    time: '2024-06-27 01:00',
                    temp_c: 20.9,
                    condition: {
                        text: 'Partly Cloudy',
                        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
                    },
                },
                {
                    time: '2024-06-27 02:00',
                    temp_c: 21.0,
                    condition: {
                        text: 'Clear',
                        icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                    },
                },
            ],
        };

        (weatherUtils.fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);
        (weatherUtils.validateCity as jest.Mock).mockReturnValue(true);

        const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');
        fireEvent.changeText(input, 'London');
        fireEvent(input, 'onEndEditing');

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        expect(getByText('London, UK')).toBeTruthy();
        expect(getByText('Sunny')).toBeTruthy();
    });
});
