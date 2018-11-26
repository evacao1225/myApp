import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class Reports extends Component {
	static navigationOptions = {
		title: 'Reports',
	};
	
	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Reports!</Text>
			</View>
		);
	}
}
