import React from 'react';
import {Alert, Button, ScrollView, StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator} from "react-native";

import axios from 'axios';

export default class SettingsScreen extends React.Component {

	static navigationOptions = {
		title: 'About',
	};

	author_error = false;
	mood_error = false;

	constructor(props) {
		super(props);
		this.state = {isLoading: false, author: '@anonymous', mood: '', button_text: 'Post Mood'}
	}

	handleSubmit = (submit) => {

		this.setState({isLoading: true});
		this.setState({button_text: 'Posting ...'});

		const api_add_moood = 'http://api.moood.trustfinity.ltd/moods';

		console.log(this.state.author);
		console.log(this.state.mood);

		// The person deleted the default anonymous and
		// forgot to enter their own alias
		// we default back to our @anonymous and not error out
		if (this.state.author.length == 0) {
			this.setState({author: '@anonymous'});
			this.author_error = true;
			return;
		}

		// Person didn't enter their mood
		if (this.state.mood.length == 0) {
			Alert.alert("Warning", "We need you to tell us your mood damn it! Why are you trying to spam us?");
			this.mood_error = true;
			return;
		}

		// We like the @ sign
		if (!this.state.author.startsWith('@')) {
			this.setState({author: '@' + this.state.author})
		}

		var formData = new FormData();
		formData.append("author", this.state.author);
		formData.append("mood", this.state.mood);

		axios.post(api_add_moood, {
			author: this.state.author,
			mood: this.state.mood
		}).then((response) => {
			this.setState({mood: ''});
			this.setState({button_text: 'Done'});
		}).catch((error) => {
			this.setState({mood: ''});
			this.setState({button_text: 'Error Occurred'});
		});

		setTimeout(()=> {
			console.log("Waiting")
		}, 2000)

		this.author_error = false;
		this.mood_error = false;
		this.setState({isLoading: false});
		this.setState({button_text: 'Post Mood'});
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.loadingContainer}>
					<View style={styles.loadingContainerItem}></View>
					<View style={styles.loadingContainerItem}>
						<ActivityIndicator size="large" color="#0000ff" animating={this.state.isLoading}/>
					</View>
					<View style={styles.loadingContainerItem}></View>
				</View>
				<Text style={styles.heading}>Add your current mood</Text>
				<Text style={{color: '#cccccc'}}>We don't really care about your mood...so go a head and tell us how
					awesome or miserable you are. :p</Text>
				<View>
					<Text style={{marginTop: 10}}>Your alias handle</Text>
					<TextInput
						onChangeText={(author) => this.setState({author})}
						value={this.state.author}
						style={styles.author}/>
					<Text style={{marginTop: 10}}>Whats on your mind?</Text>
					<TextInput
						onChangeText={(mood) => this.setState({mood})}
						value={this.state.mood}
						style={styles.mood}
						multiline={true}/>
					<Button title={this.state.button_text} onPress={this.handleSubmit} style={{marginTop: 10, marginBottom: 15}}/>
				</View>
				<View style={{marginTop: 15}}>
					<Text style={styles.heading}>About Moood</Text>
					<Text style={{color: '#595959'}}>Moood is an experimental app that I built to learn full stack
						nodejs app development</Text>
					<Text style={{color: '#595959'}}>It is free and opensource on my github page
						(github.com/mwakaambrose).</Text>
					<Text style={{color: '#595959'}}>Moood is an ecosystem of apps (Web apps[Vue.js, React.js], Mobile
						app [React Native]) and a single backend powering them.
						The Backend is an express.js app.</Text>
				</View>
			</ScrollView>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 15,
	},

	heading: {
		fontWeight: '600',
		color: '#2C4150'
	},
	author: {
		marginTop: 5,
		width: '100%',
		borderWidth: 0.5,
		borderColor: '#2C4150',
		borderRadius: 5,
		padding: 5,
	},
	mood: {
		width: '100%',
		marginTop: 5,
		borderWidth: 0.5,
		borderColor: '#2C4150',
		borderRadius: 5,
		padding: 5,
		height: 100,
		marginBottom: 10,
		lineHeight: 23,
		flex: 2,
		textAlignVertical: 'top'
	},
	loadingContainer: {
		marginTop: -25,
		flexDirection: 'row',
		alignItems: 'center'
	},
	loadingContainerItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
