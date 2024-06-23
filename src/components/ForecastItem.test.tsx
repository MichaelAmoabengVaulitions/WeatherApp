// components/ForecastItem.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import ForecastItem from './ForecastItem';

describe('ForecastItem', () => {
    it('renders correctly with given props', () => {
        const { getByText, getByTestId } = render(
            <ForecastItem
                time="10:00"
                temp_c="20°C"
                conditionIcon="https://cdn.weatherapi.com/weather/64x64/day/113.png"
                conditionTitle="Sunny"
            />,
        );

        expect(getByText('10:00')).toBeTruthy();
        expect(getByText('20°C')).toBeTruthy();
        expect(getByText('Sunny')).toBeTruthy();
        expect(getByTestId('forecast-icon')).toBeTruthy();
    });
});
