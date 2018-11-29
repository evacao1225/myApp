import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
	Button
} from 'react-native'

import { createResponder } from 'react-native-gesture-responder'
import * as force from 'd3-force'
import _ from 'underscore'

const d3 = {
  force
}

class BubbleChart extends React.Component {
	constructor(props) {
		super(props);

		this.simulation = null;

		this.state = {
			nodes: null,
			dimensions: { width: 0, height: 0 },
			focusPos: { x: 0, y: 0 },
			offsetPos: { x: 0, y: 0 },
			//zoom: 0.5,
			scale: new Animated.Value(0)
		}
	}

	componentWillMount() {
		this.updateHashtags();
		this.gestureResponder = createResponder({
			onStartShouldSetResponder: (evt, gestureState) => true,
			onStartShouldSetResponderCapture: (evt, gestureState) => false,
			onMoveShouldSetResponder: (evt, gestureState) => true,
			onMoveShouldSetResponderCapture: (evt, gestureState) => false,
			onResponderMove: (evt, gestureState) => {},
			onResponderRelease: (evt, gestureState) => {
				this.setState({
					focusPos: {
						x: this.state.focusPos.x + this.state.offsetPos.x,
						y: this.state.focusPos.y + this.state.offsetPos.y
					},
					offsetPos: { x: 0, y: 0 },
				})
			}
		})
	}

	updateHashtags() {
		var hashtags = []
		for (var i = 0; i < 25; ++i) {
			hashtags.push({
				id: i + 1,
				name: 'text',
			})
		}
		hashtags = hashtags
			.map((p, index) => {
				var radius
				if (index < 1) {
					radius = 20
				}
				else if (index < 2) {
					radius = 20
				}
				else if (index < 3) {
					radius = 20
				}
				else if (index < 10) {
					radius = 20
				}
				else if (index < 25) {
					radius = 20
				}
				else if (index < 50) {
					radius = 20
				}
				else if (index < 75) {
					radius = 10
				}
				else {
					radius = 5
				}
				return _.extend(p, {
					radius: radius / 3,
					x: NaN,
					y: NaN,
				})
			})
		this.simulation = d3.force.forceSimulation(hashtags)
			.velocityDecay(0.2)
			.force("center", d3.force.forceCenter())
			.force("x", d3.force.forceX().strength(0.002))
			.force("y", d3.force.forceY().strength(0.002))
			.force("collide", d3.force.forceCollide().radius(function (d) { return d.radius + 0.5 }));
			//.stop();

			this.setState({
				nodes: this.simulation.nodes()
			});

		// this.setState({
		// 	nodes: this.simulation.nodes()
		// }, this._onNextTick)
		//this._onNextTick();
	}

	handleLayout(e) {
		let { width, height } = e.nativeEvent.layout;
		this.setState({
			dimensions: {width, height}
		})
	}

	componentDidMount() {
	  Animated.timing(this.state.scale, {
	    toValue: 1.0,
	    duration: 1000,
	    easing: Easing.linear
	  }).start();
	}

	render() {
		var hashtags = this.state.nodes
		if (hashtags.length > 0) {
			// var width = this.state.dimensions.width;
			// var height = this.state.dimensions.height;
			var { width, height } = this.state.dimensions
			if (width !== 0 && height !== 0) {
				var nodes = hashtags.map((data, idx) => {
					var scale = ((width + height) / 300.0)
					var radius = data.radius * scale
					var x = data.x * scale + this.state.focusPos.x + this.state.offsetPos.x
					var y = data.y * scale + this.state.focusPos.y + this.state.offsetPos.y
					var color = data.color
					return (
						<View
							key={data.id}
							style={{
								backgroundColor: 'transparent',
								position: 'absolute',
								transform: [
									{ translateX: width / 2 - 100 + x },
									{ translateY: height / 2 - 100 + y },
									{ scale: radius / 100 },
								]
							}}>
							<Animated.View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: 'green',
									width: 200,
									height: 200,
									borderRadius: 100,
									transform: [{
				          scale: this.state.scale
				          }]
								}}>
								<Text
									style={{
										fontSize: 50,
										fontWeight: 'bold',
										color: 'black',
										padding: 20,
										backgroundColor: 'transparent'
									}} numberOfLines={2}>{data.name}</Text>
							</Animated.View>
						</View>
					)
				})
			}
		}
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					backgroundColor: 'white',
				}}>
         <Text style={styles.header}>
            Score SLA Summary
          </Text>
				<View
					style={{
						flex: 1,
						backgroundColor: 'white',
						overflow: 'hidden',
					}}
					onLayout={this.handleLayout.bind(this)}
					{...this.gestureResponder}>
					{nodes}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 80,
	//	marginBottom: -10
  }
});

export default BubbleChart;
