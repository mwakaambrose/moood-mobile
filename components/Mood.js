import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

export default class Mood extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>@anonymous</Text>
                <Text>This is a sample fucking mood right now</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
});
