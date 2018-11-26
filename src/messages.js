import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Utility from './utility';

export default class Messages extends Component {
	static navigationOptions = {
		title: 'Messsage List',
	};

	constructor(props) {
		super(props);

		this.state = {
			unreadMsg: 4,
			clicked: -1,
			total: 4
		};

		this.messageList = [
			{
				subject: 'Message 1',
				abstract: 'This is abstract of message 1...',
				content: 'message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content message1 content ',
				read: false,
				timestamp: 1543131063544
			},
			{
				subject: 'Message 2',
				abstract: 'This is abstract of message 2...',
				content: 'message2 content!',
				read: false,
				timestamp: 1541101063544
			},
			{
				subject: 'Message 3',
				abstract: 'This is abstract of message 3...',
				content: 'message3 content!',
				read: false,
				timestamp: 1540131063544
			},
			{
				subject: 'Message 4',
				abstract: 'This is abstract of message 4...',
				content: 'message4 content!',
				read: false,
				timestamp: 1540050003544
			}
		];

		this.handlePress = this.handlePress.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handlePress(index) {
		console.log(`${index} was clicked`);
		this.messageList[index].read = true;
		this.setState(function(state) {
			console.log(`current state: ${JSON.stringify(state)}`);
			return {
				unreadMsg: state.unreadMsg - 1,
				clicked: index
			};
		});
		this.props.navigation.navigate('MessageContent', {
			subject: this.messageList[index].subject,
			content: this.messageList[index].content,
			timestamp: this.messageList[index].timestamp,
			delete: this.handleDelete,
		});
	}

	handleDelete() {
		this.messageList.splice(this.state.clicked, 1);
		this.setState({
			total: this.state.total - 1
		})
		this.props.navigation.navigate('Messages');
	}

	showMessageItem() {
		let messageItems = [];
		if(this.messageList.length > 0) {
			const that = this;
			this.messageList.forEach(function(item, index) {
				let date = new Date(item.timestamp);
				let now = new Date();
				let sameDay = Utility.isSameDay(date, now);
				//let sameWeek = Utility.isSameWeek(date, now);
				//console.log(`sameDay: ${sameDay}`);

				messageItems.push(
					<TouchableOpacity key={item.subject} style={styles.msgItem} onPress={() => {that.handlePress(index)}}>
						<View style={styles.itemLeft}>
							<FontAwesome
								name={item.read ? 'envelope-open' : 'envelope'}
								size={20}
								color={item.read ? 'gray' : 'green'}
							/>
						</View>
						<View style={styles.itemRight}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<Text style={styles.title}>{item.subject}</Text>
								<Text style={styles.time}>
									{sameDay ? (`${date.getHours()}:${date.getMinutes()}`)
												 : (`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`)}
								</Text>
							</View>
							<Text style={styles.content}>{item.abstract}</Text>
						</View>
					</TouchableOpacity>
				);
			});
		}
		return messageItems;
	}

	render() {
		return(
			<View style={styles.container}>
				{this.showMessageItem()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	msgItem: {
		height: 60,
		marginLeft: 10,
		marginRight: 10,
		flexDirection: 'row',
		borderStyle: 'solid',
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		alignItems: 'center'
	},
	itemLeft: {
		width: 25,
		height: 25,
		marginLeft: 10,
		marginRight: 10
	},
	itemRight: {
		alignSelf: 'flex-start',
		marginTop: 10,
		flexGrow: 1,
	},
	title: {
		fontSize: 16,
		paddingLeft: 10,
		paddingBottom: 5,
		//alignItems: 'flex-start',
	},
	time: {
		color: '#6C6C6C',
	},
	content: {
		fontSize: 15,
		paddingLeft: 10,
		fontWeight: 'normal',
		color: '#6C6C6C',
	}
});
