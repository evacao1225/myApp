import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View, StatusBar, StyleSheet } from 'react-native';

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
			<View style={styles.container}>
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity style={{...styles.item0, backgroundColor: '#FF3F3F'}}>
						<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>MCO</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{...styles.item0}} onPress={() => {this.props.navigation.navigate('messageSwitchNavigator')}}>
						<View style={styles.msgBubble} />
						<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>SAP</Text>
					</TouchableOpacity>
				</View>
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity style={{...styles.item0, backgroundColor: '#0085DF'}}>
						<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>SEI</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{...styles.item0, backgroundColor: '#FFD83F'}}>
						<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Oracle</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: 'white',
	},
	item0: {
		width: 90,
		height: 48,
		backgroundColor: '#5F9F00',
		borderRadius: 10,
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	msgBubble: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#BF0000',
		position: 'absolute',
		top: -3,
		right: -3,
	}
});

export default Home;
