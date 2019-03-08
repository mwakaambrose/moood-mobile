import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true, moodsData: []}
  }

  componentDidMount(){

    const api = 'http://api.moood.trustfinity.ltd/moods-limited-eight';

    return fetch(api)
        .then((response) => response.json())
        .then((responseJson) => {

          // For debug only
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

    const items = [
      { name: '@anonymous', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' }
    ];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/thinking.png')
                  : require('../assets/images/thinking.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.appName} >Moood..</Text>
            <Text style={styles.getStartedText}>
                So fucking <Text style={styles.codeHighlightText}>relatable</Text>, The one place to complain or be happy anonymously
            </Text>
          </View>
        </ScrollView>
        <View style={styles.gridView}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: "#2C4150",
    fontWeight: 'bold'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "#2C4150",
    lineHeight: 24,
    textAlign: 'center',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#2C4150",
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
