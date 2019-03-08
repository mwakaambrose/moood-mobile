import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AddMoodScreen from "../screens/AddMoodScreen";

export default createAppContainer(
    createSwitchNavigator({
      Main: MainTabNavigator,
    }),
    createStackNavigator({
      AddMoodScreen: {screen: AddMoodScreen},
    })
);