import React, { Component } from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	RNAatkit,
	RNAatkitBanner
} from '@addapptr/react-native-aatkit'

export default class SecondScreen extends Component<{}> {
    
  static navigationOptions = {
      title: 'MREC Banner',
    };

    render() {
      const {navigate} = this.props.navigation;
      return (
				<RNAatkitBanner
					name="MRECBanner"
					size={RNAatkit.PlacementSize_Banner300x250}
					gravity={RNAatkit.ContentGravity_BannerTop}
					reloadOnStart={true}
					autoreload={true}
					style={styles.banner}
					onHaveAd={() => {
						console.log("onHaveAd MRECBanner");
					}}
					onPauseForAd={() => {
						console.log("onPauseForAd MRECBanner");
					}}
					onResumeAfterAd={() => {
						console.log("onResumeAfterAd MRECBanner");
					}}
					onNoAd={() => {
						console.log("onNoAd MRECBanner");
					}}
					onShowingEmpty={() => {
						console.log("onShowingEmpty MRECBanner");
					}} />
      );
    }
}

const styles = StyleSheet.create({
	banner: {
		backgroundColor: 'rgb(0, 0, 255)',
		width: 300,
		height: 250
	}
});