import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieScreen from './Screens/MovieScreen';
import Tv from './Screens/TvShowDetails';
import BottomNavigation from "./Screens/BottomNavigation";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={BottomNavigation} />
                <Stack.Screen name="Movie" component={MovieScreen} />
                <Stack.Screen name="Tv" component={Tv} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}