import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class User extends Component {
	static navigationOptions = {
		title: 'User',
	};

	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>User!</Text>
			</View>
		);
	}
}
