import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

export default class MessageLoading extends Component {
	constructor(props) {
		super(props);
		this.fetchMessageList();
	}

	fetchMessageList() {
		return fetch('https://jsonplaceholder.typicode.com/posts/1')
			.then((response) => response.json())
			.then((responseJson) => {
				this.props.navigation.navigate('Messages', {
					messages: responseJson
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar barStyle='default' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
