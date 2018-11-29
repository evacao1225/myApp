import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import WebView from './webview';
import BubbleChart from './bubbleChart';

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
							<MenuOption key={'share'} style={{flexDirection: 'row'}} onSelect={() => { alert('sharing with team...') }}>
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
								<MaterialIcons name={'print'} size={20} color={'#DDD'}/>
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
		this.state = {
			currentChart: 0
    };
		this.chartCount = 2;
		this.critical_value = 100;
	}

  onSwipe(gestureName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		console.log(`gestureState: ${JSON.stringify(gestureState)}`);
		if(gestureState) {
			let dx = Math.abs(gestureState.dx), dy = Math.abs(gestureState.dy);
			if(dx > dy && dx >= this.critical_value) {
				gestureName = gestureState.dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
			}else if(dy >= dx && dy >= this.critical_value) {
				gestureName = gestureName.dy > 0 ? SWIPE_DOWN : SWIPE_UP;
			}

	    switch (gestureName) {
	      case SWIPE_LEFT:
	        this.setState({
						currentChart: this.state.currentChart < this.chartCount-1 ? this.state.currentChart+1 : this.state.currentChart
					});
	        break;
	      case SWIPE_RIGHT:
	        this.setState({
						currentChart: this.state.currentChart > 0 ? this.state.currentChart-1 : this.state.currentChart
					});
	        break;
				default:
					break;
	    }
		}
  }

	componentDidMount() {
		this.props.navigation.setParams({delete: this.handleDelete});
	}

	render() {
		const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
		const date = new Date(this.message.timestamp);
		//let chartFile = this.charts[this.state.currentChart];
		//console.log(`currentChart: ${this.state.currentChart}`);
		let month = `0${date.getMonth()+1}`.slice(-2);
		let day = `0${date.getDate()}`.slice(-2);
		return (
			<View style={styles.container}>
				<View style={styles.msgHeader}>
					<Text style={{fontSize: 20}}>{this.message.subject}</Text>
					<View style={{flexDirection: 'row'}}>
						{this.message.star && <AntDesign name={'star'} color={'#FFD306'} size={12} />}
						<Text style={{fontSize: 10, color: '#6C6C6C', marginLeft: 5}}>{`${date.getFullYear()}/${month}/${day}`}</Text>
					</View>
				</View>
				<View style={styles.content}>
					<Text>{this.message.content}</Text>
				</View>
				<GestureRecognizer
        	onSwipe={(direction, state) => this.onSwipe(direction, state)}
        	config={config}
					style={{flexGrow: 1}}
        >
					<View style={{flexGrow: 1}}>
						{this.state.currentChart === 0 &&
							<View style={{alignSelf: 'center'}}>
								<WebView uri={require('./highChart3dBar_v0.html')} />
							</View>
						}
						{this.state.currentChart === 1 &&
							<BubbleChart />
						}
					</View>
				</GestureRecognizer>
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
		//marginBottom: 10,
	}
})
