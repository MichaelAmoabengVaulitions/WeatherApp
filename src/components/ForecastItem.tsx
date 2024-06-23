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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACE_LARGE,
        paddingBottom: SPACE_SMALL,
        marginLeft: 28,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colours.SECONDARY_TRANSLUCENT,
        width: 100,
        marginVertical: wp(20),
    },
    forecastIcon: {
        width: 20,
        height: 20,
    },
    condition: {
        color: Colours.PRIMARY,
    },
});

export default ForecastItem;
