import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import WebView from './webview';

export default class MessageContent extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Messsage',
			headerRight: [
				<TouchableOpacity key={'delete'} onPress={navigation.getParam('delete')}>
					<MaterialIcons name={'delete'} color={'#FFF'} size={20} style={{marginRight: 5}}/>
				</TouchableOpacity>,
				<TouchableOpacity key={'more'}>
					<Menu>
						<MenuTrigger>
							<MaterialIcons key={'more-vert'} name={'more-vert'} color={'#FFF'} size={20} style={{marginRight: 5}}/>
						</MenuTrigger>
						<MenuOptions customStyles={optionsStyles}>
							<MenuOption key={'share'} style={{flexDirection: 'row'}} onSelect={() => { alert('sharing...') }}>
								<MaterialIcons name={'share'} size={20} />
								<Text style={{marginLeft: 10}}>Share</Text>
							</MenuOption>
        			<MenuOption key={'star'} style={{flexDirection: 'row'}} onSelect={navigation.getParam('star')}>
								<AntDesign name={'staro'} size={20} />
								<Text style={{marginLeft: 10}}>Star</Text>
							</MenuOption>
							<MenuOption key={'unread'} style={{flexDirection: 'row'}} onSelect={navigation.getParam('unread')}>
								<MaterialIcons name={'markunread'} size={20} />
								<Text style={{marginLeft: 10}}>Unread</Text>
							</MenuOption>
							<MenuOption key={'print'} style={{flexDirection: 'row'}} onSelect={() => {alert('printing...')}}>
								<MaterialIcons name={'print'} size={20} />
								<Text style={{marginLeft: 10}}>Print</Text>
							</MenuOption>
						</MenuOptions>
					</Menu>
				</TouchableOpacity>
			],
		};
	};

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.message = navigation.getParam('message', {});
		this.handleDelete = navigation.getParam('delete');
	}

	componentDidMount() {
		this.props.navigation.setParams({delete: this.handleDelete});
	}

	render() {
		const date = new Date(this.message.timestamp);
		return (
			<View style={styles.container}>
				<View style={styles.msgHeader}>
					<Text style={{fontSize: 20}}>{this.message.subject}</Text>
					<View>
						{this.message.star && <AntDesign name={'star'} color={'#FFD306'} size={16} />}
						<Text style={{fontSize: 10, color: '#6C6C6C'}}>{`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</Text>
					</View>
				</View>
				<View style={styles.content}>
					<Text>{this.message.content}</Text>
				</View>
				<View style={{alignSelf: 'center'}}>
					<WebView uri={require('./highChart3dBar_v2.html')} />
				</View>
			</View>
		);
	}
}

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#FFF',
    padding: 5,
		borderRadius: 5,
		width: 150,
		//marginRight: 10,
  },
  optionsWrapper: {

  },
  optionWrapper: {
    padding: 10,
		borderStyle: 'solid',
		borderBottomColor: '#EEE',
		borderBottomWidth: 1,
  },
  optionTouchable: {
    underlayColor: 'gray',
    activeOpacity: 70,
  },
  optionText: {
    color: 'black',
		//marginLeft: 10,
  },
};

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
