import React from 'react';
import {View, Text} from "react-native";

export default class AddMoodScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Mood',
    };

    render() {
        return (
            <View>
                <Text>Mood Screen</Text>
            </View>
        );
    }
}
