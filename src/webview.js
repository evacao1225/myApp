'use strict';
import React, {Component} from 'react';
import { StyleSheet,TouchableHighlight,NavigatorIOS,Image,Text,View,WebView,PixelRatio } from 'react-native';

import Dimensions from 'Dimensions';

export default class extends Component {
	constructor(){
		super();
	}
	render() {
		// alert(this.props.uri.indexOf('https://') == 0)
		// return (<View />)
		if(typeof this.props.uri == 'string' && (this.props.uri.indexOf('http://') == 0 || this.props.uri.indexOf('https://') == 0)) {
			return(
	      <View style={styles.menu}>
				<WebView
					automaticallyAdjustContentInsets={false}
					source={{uri:this.props.uri}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					decelerationRate="normal"
					startInLoadingState={true}
				/>
	      </View>
	    );
		}
		else {
			return(
	      <View style={styles.menu}>
				<WebView
					automaticallyAdjustContentInsets={false}
					source={this.props.uri}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					decelerationRate="normal"
					startInLoadingState={true}
				/>
	      </View>
	    );
		}

  }

}

const Util = {
	size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#ffffff"
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  menu:{
    paddingTop:80,
    backgroundColor: "#ffffff",
    width: Util.size.width,
    height: Util.size.height,
  },
  btn:{
    height: 100,
    marginBottom:20,
    width:375,
  },
  img:{
    height:100,
    width:375,
    resizeMode:"cover",
  },
  textContainer:{
    height:100,
    width:375,
    position:"absolute",
    top:0,
    left:0,
    backgroundColor:"rgba(0,0,0,0.3)",
    justifyContent:"center",
  },
  text:{
    color:"#fff",
    fontSize:25,
    fontWeight:"500",
    paddingLeft:20,
  },
  itemNav:{
    color:"#fff",
    position:"absolute",
    right:20,
    top:32
  }
});
