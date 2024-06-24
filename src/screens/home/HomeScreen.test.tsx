// HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import * as weatherUtils from './utils/weatherUtils';

jest.mock('./utils/weatherUtils');

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display an error message for invalid city names', async () => {
        const { getByPlaceholderText, getByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');

        await act(async () => {
            fireEvent.changeText(input, '123');
            fireEvent(input, 'onEndEditing');
        });

        await waitFor(() =>
            expect(
                getByText('Please enter a valid city name (letters and spaces only).'),
            ).toBeTruthy(),
        );
    });

    it('should fetch and display real weather data for a valid city', async () => {
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
                    {
                        date: '2024-06-28',
                        day: {
                            avgtemp_c: 22,
                            condition: {
                                text: 'Clear',
                                icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                            },
                        },
                        hour: [
                            {
                                time_epoch: 1719450000,
                                time: '2024-06-27 03:00',
                                temp_c: 21.5,
                                condition: {
                                    text: 'Cloudy',
                                    icon: '//cdn.weatherapi.com/weather/64x64/night/119.png',
                                },
                            },
                            // Add more hourly data as needed...
                        ],
                    },
                ],
            },
        };

        (weatherUtils.fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);
        (weatherUtils.validateCity as jest.Mock).mockReturnValue(true);

        const { getByPlaceholderText, findByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');

        await act(async () => {
            fireEvent.changeText(input, 'London');
            fireEvent(input, 'onEndEditing');
        });

        await waitFor(() => expect(findByText('London, UK')).toBeTruthy());
        await waitFor(() => expect(findByText(/Sunny|Clear|Cloudy|Rain|Snow/)).toBeTruthy());
    });

    it('should display an error message if fetching weather data fails', async () => {
        (weatherUtils.fetchWeather as jest.Mock).mockRejectedValue(new Error('City not found'));

        const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');

        await act(async () => {
            fireEvent.changeText(input, 'InvalidCity');
            fireEvent(input, 'onEndEditing');
        });

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        await waitFor(() => expect(getByText('City not found')).toBeTruthy());
    });

    it('should display a specific error message for the "No location found" error', async () => {
        const error = {
            response: {
                status: 400,
                data: {
                    error: {
                        code: 1006,
                    },
                },
            },
        };
        (weatherUtils.fetchWeather as jest.Mock).mockRejectedValue(error);

        const { getByPlaceholderText, queryByText, getByTestId } = render(<HomeScreen />);
        const input = getByPlaceholderText('Enter City');

        await act(async () => {
            fireEvent.changeText(input, 'InvalidCity');
            fireEvent(input, 'onEndEditing');
        });

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        await waitFor(() => expect(getByTestId('No weather error')).toBeTruthy());
    });
});
