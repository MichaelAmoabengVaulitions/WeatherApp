import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
