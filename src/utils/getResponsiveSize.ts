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

export const RESPONSIVE_SCREEN_HEIGHT = hp(SCREEN_HEIGHT);
export const RESPONSIVE_SCREEN_WIDTH = wp(SCREEN_WIDTH);

export const SPACE_XSMALL = wp(5);
export const SPACE_SMALL = wp(10);
export const SPACE_MEDIUM = wp(15);
export const SPACE_LARGE = wp(20);
export const SPACE_XLARGE = wp(25);
export const SPACE_XXLARGE = wp(30);
