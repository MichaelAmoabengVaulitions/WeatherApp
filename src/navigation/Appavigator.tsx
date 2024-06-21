import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import { NO_HEADER } from './screenOptions';
import { HOME_SCREEN } from './screenNames';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name={HOME_SCREEN}
                    component={HomeScreen}
                    options={NO_HEADER}
                />
            </Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
