import React from 'react';
import { ScrollView, StyleSheet, Text} from 'react-native';
import Mood from '../components/Mood';

export default class MoodsScreen extends React.Component {
  static navigationOptions = {
    title: 'Moods',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> Moods loop </Text>
        <Mood/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});
