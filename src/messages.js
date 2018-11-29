import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

		// message list, which will be changed to fetch from remote when app launch.
		this.messageList = [
			{
				subject: 'Congratulations!',
				abstract: 'Congratulations! All VMs are ...',
				content: 'Congratulations! All VMs are working well. Please refer to below charts for more information. ',
				read: false,
				timestamp: 1543131063544,
				starred: false,
			},
			{
				subject: 'Message 2',
				abstract: 'This is abstract of message 2...',
				content: 'message2 content!',
				read: false,
				timestamp: 1541101063544,
				starred: false,
			},
			{
				subject: 'Message 3',
				abstract: 'This is abstract of message 3...',
				content: 'message3 content!',
				read: false,
				timestamp: 1540131063544,
				starred: false,
			},
			{
				subject: 'Message 4',
				abstract: 'This is abstract of message 4...',
				content: 'message4 content!',
				read: false,
				timestamp: 1540050003544,
				starred: false,
			}
		];

		this.handlePress = this.handlePress.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleStar = this.handleStar.bind(this);
		this.handleUnread = this.handleUnread.bind(this);
	}

	handlePress(index) {
		this.messageList[index].read = true;
		this.setState(function(state) {
			return {
				unreadMsg: state.unreadMsg - 1,
				clicked: index
			};
		});
		this.props.navigation.navigate('MessageContent', {
			message: this.messageList[index],
			delete: this.handleDelete,
			unread: this.handleUnread,
			star: this.handleStar,
		});
	}

	handleUnread() {
		console.log(`set ${this.state.clicked} unread.`)
		this.messageList[this.state.clicked].read = false;
		this.setState({
			unreadMsg: this.state.unreadMsg + 1
		});
		this.props.navigation.navigate('Messages');
	}

	handleStar() {
		console.log(`add star at the ${this.state.clicked}th message.`)
		this.messageList[this.state.clicked].star = true;
		this.props.navigation.navigate('Messages');
		this.forceUpdate();
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
				let month = `0${date.getMonth()+1}`.slice(-2);
				let day = `0${date.getDate()}`.slice(-2);

				messageItems.push(
					<TouchableOpacity key={item.subject} style={styles.msgItem} onPress={() => {that.handlePress(index)}}>
						<View style={styles.itemLeft}>
							<FontAwesome
								name={item.read ? 'envelope-open-o' : 'envelope-o'}
								size={20}
								color={item.read ? 'gray' : 'black'}
							/>
						</View>
						<View style={styles.itemRight}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<View style={{flexDirection: 'row', alignItems: 'baseline', paddingBottom: 5,}}>
									{!item.read && <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: '#005AB5'}} />}
									<Text style={styles.title}>{item.subject}</Text>
								</View>
								<View style={{flexDirection: 'row'}}>
									{item.star &&
										<AntDesign name={'star'} color={'#FFD306'} size={16} />
									}
									<Text style={styles.time}>
										{sameDay ? (`${date.getHours()}:${date.getMinutes()}`)
												 : (`${date.getFullYear()}/${month}/${day}`)}
									</Text>
								</View>

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
		borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		height: 60,
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
		paddingLeft: 5,
	},
	time: {
		color: '#6C6C6C',
		marginRight: 5,
		marginLeft: 5,
	},
	content: {
		fontSize: 15,
		paddingLeft: 10,
		fontWeight: 'normal',
		color: '#6C6C6C',
	},
});
