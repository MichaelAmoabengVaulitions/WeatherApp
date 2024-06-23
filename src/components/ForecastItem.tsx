import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SPACE_LARGE, SPACE_SMALL, wp } from '../utils/getResponsiveSize';
import Colours from '../consts/Colours';

interface ForecastItemProps {
    time: string;
    temp_c: string;
    conditionIcon: string;
    conditionTitle: string;
}

const ForecastItem: FC<ForecastItemProps> = ({ time, temp_c, conditionIcon, conditionTitle }) => {
    return (
        <View style={styles.forecastItem}>
            <Text style={styles.foreCast}>{time}</Text>
            <Text style={styles.foreCast}>{temp_c}</Text>
            <Image
                style={styles.forecastIcon}
                source={{ uri: conditionIcon }}
                testID="forecast-icon"
            />
            <Text style={styles.condition}>{conditionTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    foreCast: {
        fontSize: wp(14),
        color: Colours.PRIMARY,
    },
    forecastHeader: {
        fontSize: wp(18),
        fontWeight: 'bold',
        marginTop: SPACE_LARGE,
        color: Colours.PRIMARY,
    },
    forecastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: SPACE_LARGE,
        paddingBottom: SPACE_SMALL,
        borderBottomWidth: 1,
        borderBottomColor: Colours.PRIMARY,
    },
    forecastIcon: {
        width: wp(40),
        height: wp(40),
    },
    condition: {
        color: Colours.PRIMARY,
        width: wp(100),
    },
});

export default ForecastItem;
