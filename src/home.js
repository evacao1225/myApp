import React, { Component } from 'react';
import { Button, Text, View, StatusBar } from 'react-native';

class Home extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	componentDidMount() {
		this._navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('light-content');
		})
	}
	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Home!</Text>
			</View>
		);
	}
}

export default Home;
