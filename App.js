/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Button
} from 'react-native';
import {
	createSwitchNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
	createStackNavigator,
	createAppContainer
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/home';
import Reports from './src/reports';
import Messages from './src/messages';
import MessageContent from './src/messageContent';
import User from './src/user';

const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: '#f4511e',
	},
	headerTintColor: '#fff',
	headerTitleStyle: {
		fontWeight: 'bold',
	},
};

const homeStackNavigator = createStackNavigator(
	{ Home },
	{ defaultNavigationOptions }
);

homeStackNavigator.navigationOptions = {
	tabBarLabel: 'Home'
};

const reportStackNavigator = createStackNavigator(
	{ Reports },
	{ defaultNavigationOptions }
);
reportStackNavigator.navigationOptions = {
	tabBarLabel: 'Reports'
};

const messageStackNavigator = createStackNavigator(
	{ Messages,
		MessageContent,
	},
	{ defaultNavigationOptions }
);
messageStackNavigator.navigationOptions = {
	tabBarLabel: 'Messages'
};

const userStackNavigator = createStackNavigator(
	{ User },
	{ defaultNavigationOptions }
);
userStackNavigator.navigationOptions = {
	tabBarLabel: 'User'
};

const TabNavigator = createBottomTabNavigator({
	homeStackNavigator,
	reportStackNavigator,
	messageStackNavigator,
	userStackNavigator,
},
{
	defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ( { focused, horizontal, tintColor }) => {
				//console.log(`${JSON.stringify(navigation.state)}`)
				const { routeName } = navigation.state;
				let iconName;
				if(routeName === 'homeStackNavigator') {
					iconName = `home`;
				}else if(routeName === 'reportStackNavigator') {
					iconName = `bar-chart${focused ? '' : '-o'}`;
				}else if(routeName === 'messageStackNavigator') {
					iconName = `envelope${focused ? '' : '-o'}`;
				}else if(routeName === 'userStackNavigator') {
					iconName = `user-circle${focused ? '' : '-o'}`;
				}
				return <FontAwesome name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
			},
	}),
	tabBarOptions: {
		activeTintColor: 'tomato',
		inactiveTintColor: 'gray',
	},
});

export default createAppContainer(TabNavigator);
