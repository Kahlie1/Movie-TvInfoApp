/**
 * Bottom Navigation
 *
 * Navigation to the main app screens
 *
 */

import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "./Movies";
import TvShows from "./TvShows";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavigation = () => {

const Tab = createBottomTabNavigator();
    return (
 
      <Tab.Navigator
        tabBarOptions={{
          style: {
              backgroundColor: '#212121',
          },
          activeTintColor: "#FEAD44",
          inactiveTintColor: "#DCDCDC",
            }}
      >

        <Tab.Screen
          name="Movies"
          component={Movies}
          options={{
            tabBarLabel: "Movies",
            tabBarColor: "#009387",
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-open"
              style={{ color: color }}
              size={26}
            />
          ),
          }}
        />

        <Tab.Screen
          name="TvShows"
          component={TvShows}
          options={{
            tabBarLabel: "Tv",
            tabBarColor: "#009387",
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="television-play"
              style={{ color: color }}
              size={26}
            />
          ),
          }}
            />

      </Tab.Navigator>
    );
}

export default BottomNavigation;