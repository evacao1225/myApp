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
import PropTypes from 'prop-types';
import d33 from 'd3';

const d3 = {
  force
}

class BubbleChart extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		this.simulation = null;
		this.state = {
			nodes: null,
			nodesAll: null,
			nodesProd: null,
			nodesNonProd: null,
			dimensions: { width: 0, height: 0 },
			focusPos: { x: 0, y: 0 },
			offsetPos: { x: 0, y: 0 },
			//zoom: 0.5,
			scale: new Animated.Value(0),
			display: 'all',
			renderedNodes: null
		};
		this.cusColor = {
				meet: '#41962A',
				miss: '#BD271A'
		};
	}

	componentWillMount() {
		this.gestureResponder = createResponder({
			onStartShouldSetResponder: (evt, gestureState) => true,
			onStartShouldSetResponderCapture: (evt, gestureState) => false,
			onMoveShouldSetResponder: (evt, gestureState) => true,
			onMoveShouldSetResponderCapture: (evt, gestureState) => false,
			onResponderMove: (evt, gestureState) => {
			}
		})
	}

	/*updateHashtags() {
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
									backgroundColor: '#5F9F00',
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

export default BubbleChart;*/

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
			var radius;
			var production;
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
			if(index % 2 == 0) {
				production = "yes";
			}else {
				production = "no";
			}
			return _.extend(p, {
				radius: radius / 3,
				production: production,
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

formateData() {
	// formate data
	let extractData = this.props.data.map(function(item) {
			if(item['achieved'] === 'meet'){
				let gapFloat = parseFloat(item['actual']) -  parseFloat(item['target']);
				if (parseFloat(item['actual']) !== 1) {
					item.radius = parseInt(gapFloat * 100) + 1;
				} else {
					item.radius = parseInt(gapFloat * 100) + 2;
				}
			}else if(item['achieved'] === 'miss') {
				item.radius = 2;
			}
			//judge the size by production type
			if (item['production'] !== undefined && item['production'].toLowerCase() === 'yes') {
				item.radius += 10;
			} else {
				item.radius += 5;
			}
			return {
				key: item['sid'],
				value: item['radius'],
				achieved: item['achieved'],
				actual: (Math.round(item['actual']*100*100)/100)+'%',
				target: (Math.round(item['target']*100*100)/100)+'%',
				production: item['production'].toLowerCase()
			};
	});
	// formate nodes
	const _self = this;
	this.max_radius = d33.max(extractData, function(d) {
		return parseInt(d.value);
	});
	this.radius_scale = d33.scale.pow().exponent(0.5).domain([0, this.max_radius]).range([2, 10]);
	this.formatedData = extractData.map(function(each){
		let node = {};
		node = {
			key: each.key,
			value: each.value,
			radius: _self.radius_scale(parseInt(each.value)),
			color: _self.cusColor[each.achieved],
			achieved: each.achieved,
			actual: each.actual,
			target: each.target,
			production: each.production,
			x: NaN,
			y: NaN
		};
		return node;
	});
}

getNodes() {
	let simulation = d3.force.forceSimulation(this.formatedData)
		.velocityDecay(0.2)
		.force("center", d3.force.forceCenter())
		.force("x", d3.force.forceX().strength(0.002))
		.force("y", d3.force.forceY().strength(0.002))
		.force("collide", d3.force.forceCollide().radius(function (d) { return d.radius + 0.5 }));

	return simulation.nodes();
}

getProdNodes() {
	let prodData = [];
	this.formatedData.forEach(function(item){
		if(item['production'].toLowerCase() === 'yes') {
			prodData.push(item);
		}
	});

	let simuProd = d3.force.forceSimulation(prodData)
		.velocityDecay(0.2)
		.force("center", d3.force.forceCenter())
		.force("x", d3.force.forceX().strength(0.002))
		.force("y", d3.force.forceY().strength(0.002))
		.force("collide", d3.force.forceCollide().radius(function (d) { return d.radius + 0.5 }));

	return simuProd.nodes();
}

getNonProdNodes() {
	let nonProdData = [];
	this.formatedData.forEach(function(item){
		if(item['production'].toLowerCase() === 'no') {
			nonProdData.push(item);
		}
	});

	let nonSimuProd = d3.force.forceSimulation(nonProdData)
		.velocityDecay(0.2)
		.force("center", d3.force.forceCenter())
		.force("x", d3.force.forceX().strength(0.002))
		.force("y", d3.force.forceY().strength(0.002))
		.force("collide", d3.force.forceCollide().radius(function (d) { return d.radius + 0.5 }));

	return nonSimuProd.nodes();
}

handleLayout(e) {
	let { width, height } = e.nativeEvent.layout;
	this.setState({
		dimensions: {width, height}
	})
}

componentDidMount() {
	this.formateData();
	Animated.timing(this.state.scale, {
		toValue: 1.0,
		duration: 1000,
		easing: Easing.linear
	}).start();
}

displayAll() {
	this.setState({
		display: 'all'
	})
}

displayByProd() {
	this.setState({
		display: 'production'
	})
}

renderNodes() {
	let { width, height } = this.state.dimensions;
	let nodes = this.getNodes()
	let renderedNodes = nodes.map((data, idx) => {
		let scale = ((width + height) / 300.0);
		let radius = data.radius * scale;
		let x = data.x * scale;
		let y = data.y * scale;
		let color = data.color;
		console.log("1111 width " + width);
		console.log("2222 height " + height);
		console.log("3333 radius " + radius);
		return (
			<View
				key={idx}
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
						backgroundColor: color,
						width: 200,
						height: 200,
						borderRadius: 100,
						transform: [{
						scale: this.state.scale
						}]
					}}>
					<Text
						style={{
							fontSize: 44,
							fontWeight: 'bold',
							color: 'black',
							padding: 20,
							backgroundColor: 'transparent'
						}} numberOfLines={2}>{data.key}</Text>
				</Animated.View>
			</View>
		)
	});

	return renderedNodes;
}

renderProdNodes() {
	let prodNodes = this.getProdNodes();
	let { width, height } = this.state.dimensions;
	let nodes = prodNodes.map((data, idx) => {
		let scale = ((width + height) / 300.0);
		let radius = data.radius * scale;
		let x = data.x * scale + this.state.focusPos.x + this.state.offsetPos.x;
		let y = data.y * scale + this.state.focusPos.y + this.state.offsetPos.y;
		let color = data.color;
		return (
			<View
				key={idx}
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
						backgroundColor: color,
						width: 200,
						height: 200,
						borderRadius: 100,
						transform: [{
						scale: this.state.scale
						}]
					}}>
					<Text
						style={{
							fontSize: 44,
							fontWeight: 'bold',
							color: 'black',
							padding: 20,
							backgroundColor: 'transparent'
						}} numberOfLines={2}>{data.key}</Text>
				</Animated.View>
			</View>
		)
	});
	return nodes;
}

renderNonProdNodes() {
	let nProdNodes = this.getNonProdNodes();
	let { width, height } = this.state.dimensions;
	let nodes = nProdNodes.map((data, idx) => {
		let scale = ((width + height) / 300.0);
		let radius = data.radius * scale;
		let x = data.x * scale + this.state.focusPos.x + this.state.offsetPos.x;
		let y = data.y * scale + this.state.focusPos.y + this.state.offsetPos.y;
		let color = data.color;
		return (
			<View
				key={idx}
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
						backgroundColor: color,
						width: 200,
						height: 200,
						borderRadius: 100,
						transform: [{
						scale: this.state.scale
						}]
					}}>
					<Text
						style={{
							fontSize: 44,
							fontWeight: 'bold',
							color: 'black',
							padding: 20,
							backgroundColor: 'transparent'
						}} numberOfLines={2}>{data.key}</Text>
				</Animated.View>
			</View>
		)
	});
	return nodes;
}

render() {
	let nodes = null;
	let pnodes = null;
	let npnodes = null;

	if(this.state.display === 'all') {
		nodes = this.renderNodes();
	}
	if(this.state.display === 'production') {
		pnodes = this.renderProdNodes();
		npnodes = this.renderNonProdNodes();
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white'
			}}>
			<Text style={styles.header}>
					Score SLA Summary
			</Text>
			{this.state.display === 'all' &&
			 <View style={{
					 flex: 1,
					 backgroundColor: 'white',
					 overflow: 'hidden'
				 }}
				 onLayout={this.handleLayout.bind(this)}
				 {...this.gestureResponder}>
				 {nodes}
			 </View>
			}
			{this.state.display === 'production' &&
			 <View style={{
					 flex: 1,
					 flexDirection: 'row',
					 backgroundColor: 'white'
					}}>
				<View style={{
					flex: 1,
					backgroundColor: 'white'
					}}
				 onLayout={this.handleLayout.bind(this)}
				 {...this.gestureResponder}>
				 <Text style={{flex: 1, marginLeft: 40, marginTop: 40}}>Production</Text>
				 {pnodes}
			 </View>
			 <View
				style={{
					flex: 1,
					backgroundColor: 'white'
				}}
				onLayout={this.handleLayout.bind(this)}
				{...this.gestureResponder}>
				<Text style={{flex: 1, marginLeft: 40, marginTop: 40}}>Non-Production</Text>
				{npnodes}
			</View>
		</View>
		}
		<View style={styles.button}>
			<View style={styles.buttonAll}>
			<Button onPress={this.displayAll.bind(this)} title="All Environment" />
			</View>
			<View style={styles.buttonByProd}>
			<Button onPress={this.displayByProd.bind(this)} title="By Production" />
			</View>
		</View>
	</View>
	)
}
}

const styles = StyleSheet.create({
header: {
	fontSize: 20,
	textAlign: 'center',
	marginTop: 120,
	marginBottom: 20
},
button: {
	flex: 1,
	flexDirection: 'row'
},

buttonAll: {
	flex: 1
	// backgroundColor: '#4F94CD',
	// height:30
	//display: inline
	//display: 'inline-block'
},
buttonByProd: {
	flex: 1
},
legend: {
	flex: 1,
	flexDirection: 'row',
	backgroundColor: 'white',
	marginTop:30
},
legend1: {
	flex: 1,
	height: 5,
	backgroundColor: 'green',
	marginLeft: 10,
	marginRight: 50
},
legend2: {
	flex: 1,
	height: 5,
	backgroundColor: 'red'
}
});

BubbleChart.defaultProps = {
data:[
{"sid":"QF3", "target":"0.9955", "actual":"0.9995", "achieved":"meet", "production":"yes"},
{"sid":"HE2", "target":"0.99", "actual":"0.9955", "achieved":"meet", "production":"no"},
{"sid":"CP9", "target":"0.9999", "actual":"1.0000", "achieved":"meet", "production":"yes"},
{"sid":"SF1", "target":"0.995", "actual":"0.997", "achieved":"meet", "production":"no"},
{"sid":"PDN", "target":"0.997", "actual":"1.0000", "achieved":"meet", "production":"yes"},
{"sid":"ET2", "target":"0.997", "actual":"0.999", "achieved":"meet", "production":"no"},
{"sid":"H4S", "target":"0.998", "actual":"0.998", "achieved":"meet", "production":"yes"},
{"sid":"FP0", "target":"0.99", "actual":"0.998", "achieved":"meet", "production":"no"},
{"sid":"C6W", "target":"0.9955", "actual":"0.998", "achieved":"meet", "production":"yes"},
{"sid":"SCQ", "target":"0.99", "actual":"0.9999", "achieved":"meet", "production":"no"},
{"sid":"Q4O", "target":"0.9999", "actual":"1.0000", "achieved":"meet", "production":"yes"},
{"sid":"DDI", "target":"0.995", "actual":"0.9999", "achieved":"meet", "production":"no"},
{"sid":"PSC", "target":"0.9999", "actual":"0.9995", "achieved":"miss", "production":"yes"},
{"sid":"DAP", "target":"0.998", "actual":"0.997", "achieved":"miss", "production":"no"},
{"sid":"HIP", "target":"0.9955", "actual":"0.9955", "achieved":"meet", "production":"yes"},
{"sid":"EC1", "target":"0.99", "actual":"0.9995", "achieved":"meet", "production":"no"},
{"sid":"GGQ", "target":"0.999", "actual":"0.9995", "achieved":"meet", "production":"yes"},
{"sid":"GBD", "target":"0.99", "actual":"0.995", "achieved":"meet", "production":"no"},
{"sid":"BWP", "target":"0.997", "actual":"0.9999", "achieved":"meet", "production":"yes"},
{"sid":"PD6", "target":"0.99", "actual":"0.998", "achieved":"meet", "production":"no"}
]
};

export default BubbleChart;
