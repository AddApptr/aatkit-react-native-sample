import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	View
} from 'react-native';
import {
	RNAatkit,
	RNAatkitBanner
} from '@addapptr/react-native-aatkit'

export default class ReuseBannerScreen2 extends Component<{}> {
    
  static navigationOptions = {
      title: 'Re-use BannerOne (Screen 2)',
    };

    render() {
      const {navigate} = this.props.navigation;
      return (
		<View style={styles.container}>	
			<RNAatkitBanner
				name="BannerOne"
				size={RNAatkit.PlacementSize_Banner320x50}
				gravity={RNAatkit.ContentGravity_BannerTop}
				reloadOnStart={true}
				autoreload={true}
				style={styles.banner}
				onHaveAd={() => {
					console.log("onHaveAd BannerOne");
				}}
				onPauseForAd={() => {
					console.log("onPauseForAd BannerOne");
				}}
				onResumeAfterAd={() => {
					console.log("onResumeAfterAd BannerOne");
				}}
				onNoAd={() => {
					console.log("onNoAd BannerOne");
				}}
				onShowingEmpty={() => {
					console.log("onShowingEmpty BannerOne");
				}} />
				<Button
        			title="Go to the home screen"
					onPress={
						() => {
							navigate('Home');
						}
				 	}
      			/>
		</View>
      );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
	banner: {
		backgroundColor: 'rgb(0, 0, 255)',
		width: 320,
		height: 50,
		marginBottom: 10
	}
});