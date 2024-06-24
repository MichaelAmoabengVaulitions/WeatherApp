import { PixelRatio, Dimensions } from 'react-native';

interface ResponsiveType {
    (size: number): number;
}

const DESIGN_HEIGHT = 844;
const DESIGN_WIDTH = 390;

export const SCREEN_HEIGHT: number = Dimensions.get('screen').height;
export const SCREEN_WIDTH: number = Dimensions.get('screen').width;

export const hp: ResponsiveType = (value: number) => {
    const dimension = (value / DESIGN_HEIGHT) * 100;
    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * dimension) / 100);
};

export const wp: ResponsiveType = (value: number) => {
    const dimension = (value / DESIGN_WIDTH) * 100;
    return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * dimension) / 100);
};

export const SPACE_SMALL = wp(10);
export const SPACE_MEDIUM = wp(15);
export const SPACE_LARGE = wp(20);
