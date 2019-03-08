import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { Button, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class MoodsScreen extends React.Component {

  static navigationOptions = {
    title: 'Moods',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true, moodsData: []}
  }

  _popUpNewMoodDialog() {
    Alert.alert('You tapped the button!')
  }

  componentDidMount(){

    const api = 'http://api.moood.trustfinity.ltd/moods';

    return fetch(api)
        .then((response) => response.json())
        .then((responseJson) => {

          // For debug only
          console.log("Debug")
          console.log(responseJson)

          this.setState({
            isLoading: false,
            moodsData: responseJson,
          }, () =>{

          });
        })
        .catch((error) =>{
          console.error(error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 15}}>
          <Button
              onPress={this._popUpNewMoodDialog}
              title="Go ahead, post your mood"
              color="#0074B3"
              accessibilityLabel="Post your mood"/>
        </View>
        <FlatGrid
            itemDimension={130}
            items={this.state.moodsData}
            renderItem={({ item, index }) => (
                <View style={[styles.itemContainer]}>
                  <Text style={styles.itemMoodAuthor}>{item.author}</Text>
                  <Text style={styles.itemMood}>{item.mood}</Text>
                </View>
            )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridView: {
    marginTop: 20,
    height: 200
  },
  itemContainer: {
    borderWidth: 0.5,
    borderColor: '#2C4150',
    borderRadius: 5,
    padding: 10,
  },
  itemMoodAuthor: {
    fontWeight: '600',
  },
  itemMood: {
    fontSize: 12,
  },
});
