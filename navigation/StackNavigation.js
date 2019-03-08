import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AddMoodScreen from "../screens/AddMoodScreen";

export default createAppContainer(
    createStackNavigator({
        AddMoodScreen: {screen: AddMoodScreen},
    })
);