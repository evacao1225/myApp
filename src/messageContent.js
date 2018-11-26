import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class MessageContent extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Messsage',
			headerRight: [
				<TouchableOpacity onPress={navigation.getParam('delete')}>
					<MaterialIcons key={'delete'} name={'delete'} color={'#FFF'} size={20} style={{marginRight: 5}}/>
				</TouchableOpacity>,
				<TouchableOpacity onPress={navigation.getParam('more')}>
					<MaterialIcons key={'more-vert'} name={'more-vert'} color={'#FFF'} size={20} style={{marginRight: 5}}/>
				</TouchableOpacity>
			],
		};
	};

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.subject = navigation.getParam('subject', 'Unknown');
		this.content = navigation.getParam('content', 'content here!');
		this.timestamp = navigation.getParam('timestamp', 'Unknown');
		this.handleDelete = navigation.getParam('delete');
	}

	componentDidMount() {
		this.props.navigation.setParams({delete: this.handleDelete});
		this.props.navigation.setParams({more: this.handleMore});
	}

	handleMore() {
		
	}

	render() {
		const date = new Date(this.timestamp);
		return (
			<View style={styles.container}>
				<View style={styles.msgHeader}>
					<Text style={{fontSize: 20}}>{this.subject}</Text>
					<Text style={{fontSize: 10, color: '#6C6C6C'}}>{`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</Text>
				</View>
				<View style={styles.content}>
					<Text>{this.content}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 20,
		marginRight: 20,
	},
	msgHeader: {
		//flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderStyle: 'solid',
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		//height: 30,
		paddingBottom: 10,
		paddingTop: 10,
	},
	content: {
		//flexGrow: 1,
		marginTop: 10,
		marginBottom: 10,
	}
})
