import React from 'react';
import {ActivityIndicator, Button, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default class MoodsScreen extends React.Component {

	static navigationOptions = {
		title: 'Moods',
	};

	constructor(props) {
		super(props);
		this.state = {isLoading: true, moodsData: [], visible: false}
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.fetchData().then(() => {
			this.setState({refreshing: false});
		});
	};

	componentDidMount() {
		return this.fetchData();
	}

	fetchData() {

		const api = 'http://api.moood.trustfinity.ltd/moods';

		return fetch(api)
			.then((response) => response.json())
			.then((responseJson) => {

				// For debug only
				console.log("Debug");
				console.log(responseJson);

				this.setState({
					isLoading: false,
					moodsData: responseJson,
				}, () => {

				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {

		return (
			<View style={styles.container} refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh}
					colors={'#0074B3'}
				/>
			}>
				<View style={styles.loadingContainer}>
					<View style={styles.loadingContainerItem}></View>
					<View style={styles.loadingContainerItem}>
						<ActivityIndicator size="large" color="#0000ff" animating={this.state.isLoading}/>
					</View>
					<View style={styles.loadingContainerItem}></View>
				</View>
				<FlatGrid
					itemDimension={130}
					items={this.state.moodsData}
					renderItem={({item, index}) => (
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
	loadingContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	loadingContainerItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
