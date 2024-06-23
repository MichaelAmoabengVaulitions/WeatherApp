// components/WeatherCard.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from './WeatherCard';
import { Forecast } from '../utils/weatherUtils';

describe('WeatherCard', () => {
    const mockForecast: Forecast[] = [
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
    ];

    it('renders correctly with given props', () => {
        const { getByText, getByTestId } = render(
            <WeatherCard
                name="London"
                country="UK"
                currentConditionIcon="https://cdn.weatherapi.com/weather/64x64/day/113.png"
                currentConditionText="Sunny"
                fiveHourForecast={mockForecast}
            />,
        );

        expect(getByText('London, UK')).toBeTruthy();
        expect(getByText('Sunny')).toBeTruthy();
        expect(getByTestId('weather-icon')).toBeTruthy();
        expect(getByText('Forecast for the next 5 hours')).toBeTruthy();
    });

    it('renders forecast items correctly', () => {
        const { getAllByText } = render(
            <WeatherCard
                name="London"
                country="UK"
                currentConditionIcon="https://cdn.weatherapi.com/weather/64x64/day/113.png"
                currentConditionText="Sunny"
                fiveHourForecast={mockForecast}
            />,
        );

        expect(getAllByText('01:00').length).toBeGreaterThan(0);
        expect(getAllByText('02:00').length).toBeGreaterThan(0);
    });

    it('displays "Now" for the current hour in their timezone', () => {
        const currentForecast = [
            {
                time_epoch: Date.now() / 1000,
                time: new Date().toISOString(),
                temp_c: 22.0,
                condition: {
                    text: 'Clear',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                },
            },
        ];

        const { getByText } = render(
            <WeatherCard
                name="London"
                country="UK"
                currentConditionIcon="https://cdn.weatherapi.com/weather/64x64/day/113.png"
                currentConditionText="Sunny"
                fiveHourForecast={currentForecast}
            />,
        );

        expect(getByText('Now')).toBeTruthy();
    });
});
