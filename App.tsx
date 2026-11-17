import React, { Component } from 'react';
import {
	Button,
	Platform,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Alert,
	Image
} from 'react-native';
import {
	RNAatkit,
	RNAatkitBanner,
	RNAatkitUnifiedNativeAd,
	TitleView,
	DescriptionView,
	ImageView,
	IconView,
	CallToActionView,
	GoogleImageView,
	GoogleUnifiedNativeAdView,
	GenericNativeAdView,
} from '@addapptr/react-native-aatkit'

import { NativeEventEmitter } from 'react-native';

const aatkitEmitter = new NativeEventEmitter(RNAatkit);

const subscriptionHaveAd = aatkitEmitter.addListener(
	'AATKitHaveAd',
	(data) => console.log("AATKitHaveAd placementName " + data.placementName)
);

const subscriptionNoAds = aatkitEmitter.addListener(
	'AATKitNoAds',
	(data) => console.log("AATKitNoAds placementName: " + data.placementName)
);

const subscriptionPauseForAd = aatkitEmitter.addListener(
	'AATKitPauseForAd',
	(data) => console.log("AATKitPauseForAd placementName: " + data.placementName)
);

const subscriptionResumeAfterAd = aatkitEmitter.addListener(
	'AATKitResumeAfterAd',
	(data) => console.log("AATKitResumeAfterAd placementName: " + data.placementName)
);

const subscriptionUserEarnedIncentive = aatkitEmitter.addListener(
	'AATKitUserEarnedIncentive',
	(data) => console.log("AATKitUserEarnedIncentive placementName: " + data.placementName)
);

const subscriptionAdExpired = aatkitEmitter.addListener(
	'AATKitAdExpired',
	(data) => console.log("AATKitAdExpired placementName: " + data.placementName)
);

const subscriptionObtainedAdRules = aatkitEmitter.addListener(
	'AATKitObtainedAdRules',
	(data) => console.log("AATKitObtainedAdRules fromTheServer: " + data.fromTheServer)
);

const managedConsentNeedsUserInterface = aatkitEmitter.addListener(
	'managedConsentNeedsUserInterface',
	() => 
	{
		console.log("managedConsentNeedsUserInterface");
	}
);

const managedConsentCMPFinished = aatkitEmitter.addListener(
	'managedConsentCMPFinished',
	(data) => 
	{
		console.log("managedConsentCMPFinished data: " + data.state);
	}
);

const subscriptionCountedAdSpace= aatkitEmitter.addListener(
	'countedAdSpace',
	(data) => console.log("[Statistics] countedAdSpace placementName " + data.placementName)
);

const subscriptionCountedRequest = aatkitEmitter.addListener(
	'countedRequest',
	(data) => console.log("[Statistics] countedRequest placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedResponse = aatkitEmitter.addListener(
	'countedResponse',
	(data) => console.log("[Statistics] countedResponse placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedImpression = aatkitEmitter.addListener(
	'countedImpression',
	(data) => console.log("[Statistics] countedImpression placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedVimpression = aatkitEmitter.addListener(
	'countedVimpression',
	(data) => console.log("[Statistics] countedVimpression placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedNimpression = aatkitEmitter.addListener(
	'countedNimpression',
	(data) => console.log("[Statistics] countedNimpression placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedClick = aatkitEmitter.addListener(
	'countedClick',
	(data) => console.log("[Statistics] countedClick placementName " + data.placementName + " network " + data.network)
);

const subscriptionCountedExpired = aatkitEmitter.addListener(
	'countedExpired',
	(data) => console.log("[Statistics] countedExpired placementName " + data.placementName + " network " + data.network)
);

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
		'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

	static navigationOptions = {
		title: 'AATKit React Native Example',
	  };

	constructor(props) {
		super(props);
		this.state = { 
			autoReloadMultisizeBanner: true,
		};

		RNAatkit.setDebugEnabled(true);
		RNAatkit.initWithConfigurationAndCallback({
				testModeAccountID: 74,
				consent: {
					type: RNAatkit.ConsentType_ManagedCMPGoogle
				},
				networkOptions: {
					dfpOptions : {
						inlineBannerMaxHeight: 10
					},
					appNexusOptions: {
						autoCloseTime: 3, 
						supportVideoBanner: false
					},
					metaBiddingOptions: {
						platformId: "abcdefg12345678"
					}
				}
			},
			(initialized) => {
				console.log("Is AATKit initialized: " + initialized);

				RNAatkit.setDebugShakeEnabled(true);
				RNAatkit.createInFeedBannerPlacement(
					"InFeed", 
					{
						loadingType: RNAatkit.InFeedBannerPlacementLoadingType_Requests,
						cacheSize : 5
					});
				RNAatkit.configureDebugScreen(
					{
						title: "React Native Sample App",
						showDebugLogsToggle: false,
						showDeviceFilteredRulesToggle: false,
						showCloseButton: false
					}
				)
			}
		);
	}

	log(message) {
		console.log("[RNAatkit App.js] " + message);
	}

	componentDidMount() {
		this.log("componentDidMount");
		this._sub = this.props.navigation.addListener(
			'didFocus',
			() => {
				this.setState( {
					autoReloadMultisizeBanner: true
				});
			}
		  );
	}

	componentWillUnmount() {
		this._sub.remove();
	}

	onShowConsentDialogIfNeeded() {
		RNAatkit.showConsentDialogIfNeeded();
	}

	onShowConsentDialog() {
		RNAatkit.editConsent();
	}

	onPressShowDebugInfo() {
		var versionInfo;
		RNAatkit.getVersion(
			(version) => {
				versionInfo = version;
			});
		RNAatkit.getDebugInfo(
			(debugInfo) => {
				Alert.alert("AATKit ReactNative " + versionInfo,
					debugInfo,
					[{ text: 'CLOSE', onPress: () => this.log('CLOSE Pressed') }],
					{ cancelable: true }
				)
			});
	}
	
	onPressCreateFullscren() {
		RNAatkit.createPlacement("FullscreenAd", RNAatkit.PlacementSize_Fullscreen);
	}

	onPressReloadFullscreen() {
		var placementReloaded = RNAatkit.reloadPlacement(
			"FullscreenAd", (placementReloaded) => {
				console.log("placementReloaded " + placementReloaded);
			});
	}

	onPressShowFullscreen() {
		RNAatkit.showPlacement("FullscreenAd", (interstitialShown) => {
			console.log("interstitialShown " + interstitialShown);
		});
	}

	onPressReloadNativeAd() {
		RNAatkit.reloadPlacement("unifiedNativeAd",  (placementReloaded) => {
			console.log("placementReloaded " + placementReloaded);
		});
	}

	onPressGetNativeAd() {
		RNAatkit.showUnifiedNativeAdPlacement("unifiedNativeAd");
	}

	render() {
		const {navigate} = this.props.navigation;

		return (
			<View style={styles.container}>	
				<Button
        			title="MREC Banner"
					onPress={
						() => {
							this.setState( {
								autoReloadMultisizeBanner: false
							});
							navigate('MRECBanner');
						}
				 	}
      			/>

				<Button
        			title="InFeed"
					onPress={
						() => {
							this.setState( {
								autoReloadMultisizeBanner: false
							});
							navigate('InFeed');
						}
				 	}
      			/>

				<Button
        			title="Re-use BannerOne"
					onPress={
						() => {
							this.setState( {
								autoReloadMultisizeBanner: false
							});
							navigate('ReuseBannerScreen');
						}
				 	}
      			/>

				<RNAatkitBanner
					name="BannerOne"
					size={RNAatkit.PlacementSize_Banner320x50}
					gravity={RNAatkit.ContentGravity_BannerTop}
					reloadOnStart={true}
					autoreload={false}
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
					}} 
					
					//Statistics
					onCountedAdSpace={() => {
						console.log("[Statistics Banner One] countedAdSpace");
					}}
					onCountedRequest={(data) => {
						console.log("[Statistics Banner One] countedRequest network " + data.network);
					}}
					onCountedResponse={(data) => {
						console.log("[Statistics Banner One] countedResponse network " + data.network);
					}}
					onCountedImpression={(data) => {
						console.log("[Statistics Banner One] countedImpression network " + data.network);
					}}
					onCountedVimpression={(data) => {
						console.log("[Statistics Banner One] countedVimpression network " + data.network);
					}}
					onCountedNimpression={(data) => {
						console.log("[Statistics Banner Two] countedNimpression network " + data.network);
					}}
					onCountedClick={(data) => {
						console.log("[Statistics Banner One] countedClick network " + data.network);
					}}
					
					/>

				<ScrollView style={styles.scroll}>
				<Button
						onPress={this.onPressShowDebugInfo.bind(this)}
						title="Show debug info"
						color="#841584"
						accessibilityLabel="Show debug info"/>
				<Button
						onPress={this.onShowConsentDialogIfNeeded.bind(this)}
						title="Show consent dialog if needed"
						color="#841584"
						accessibilityLabel="Show consent dialog if needed"/>
				<Button
						onPress={this.onShowConsentDialog.bind(this)}
						title="Show consent dialog"
						color="#841584"
						accessibilityLabel="Show consent dialog"/>

					<Text style={styles.welcome}>
						Fullscreen ad options
        			</Text>

					<Button
						onPress={this.onPressCreateFullscren}
						title="Create fullscreen"
						color="#841584"
						accessibilityLabel="Create fullscreen"/>
					<Button
						onPress={this.onPressReloadFullscreen}
						title="Reload fullscreen"
						color="#841584"
						accessibilityLabel="Reload fullscreen"/>
					<Button
						onPress={this.onPressShowFullscreen}
						title="Show fullscreen"
						color="#841584"
						accessibilityLabel="Show fullscreen"/>

					<Text style={styles.welcome}>
						Native ads options
        			</Text>

					<View style={{ height: 200 }} />
					
					<RNAatkitUnifiedNativeAd 
					style={styles.nativeAd} name="unifiedNativeAd"
					showTestDataForLayout={RNAatkitUnifiedNativeAd.googleLayout}
					>

						<GoogleUnifiedNativeAdView style={styles.nativeAd}>
							<View style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
								<TitleView style={{color:"yellow"}} />
								<IconView style={{width: 20, height: 20}} />
							</View>
							<GoogleImageView style={{width: 320, height: 166}} />
							<DescriptionView />
							<View style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
								<Text>
									Sponsored
								</Text>
								<View style={{backgroundColor:"blue"}}>
									<CallToActionView style={{color:"white"}} />
								</View>
							</View>
						</GoogleUnifiedNativeAdView>

						<GenericNativeAdView style={styles.nativeAd}>
							<View style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
								<TitleView style={{color:"blue"}} />
								<IconView style={{width: 20, height: 20}} />
							</View>
							<ImageView style={{width: 320, height: 166}} />
							<DescriptionView />
							<View style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
								<Text>
									Sponsored
								</Text>
								<View style={{backgroundColor:"blue"}}>
									<CallToActionView style={{color:"white"}} />
								</View>
							</View>
						</GenericNativeAdView>
					
					</RNAatkitUnifiedNativeAd>


					<Button
						onPress={this.onPressReloadNativeAd.bind(this)}
						title="Reload native ad"
						color="#841584"
						accessibilityLabel="Reload native ad" />
					<Button
						onPress={this.onPressGetNativeAd.bind(this)}
						title="Get native ad"
						color="#841584"
						accessibilityLabel="Get native ad" />

					<RNAatkitBanner
						reloadOnStart={true}
						autoreload={this.state.autoReloadMultisizeBanner}
						name="BannerTwo"
						size={RNAatkit.PlacementSize_MultiSizeBanner}
						style={styles.multisizeBanner}
						onHaveAdForPlacementWithBannerView={() => {
							console.log("onHaveAdForPlacementWithBannerView BannerTwo");
						}}
						onPauseForAd={() => {
							console.log("onPauseForAd BannerTwo");
						}}
						onResumeAfterAd={() => {
							console.log("onResumeAfterAd BannerTwo");
						}}
						onNoAd={() => {
							console.log("onNoAd BannerTwo");
						}}
						onShowingEmpty={() => {
							console.log("onShowingEmpty BannerTwo");
						}} 

						//Statistics
						onCountedAdSpace={() => {
							console.log("[Statistics Banner Two] countedAdSpace");
						}}
						onCountedRequest={(data) => {
							console.log("[Statistics Banner Two] countedRequest network " + data.network);
						}}
						onCountedResponse={(data) => {
							console.log("[Statistics Banner Two] countedResponse network " + data.network);
						}}
						onCountedImpression={(data) => {
							console.log("[Statistics Banner Two] countedImpression network " + data.network);
						}}
						onCountedVimpression={(data) => {
							console.log("[Statistics Banner Two] countedVimpression network " + data.network);
						}}
						onCountedNimpression={(data) => {
							console.log("[Statistics Banner Two] countedNimpression network " + data.network);
						}}
						onCountedClick={(data) => {
							console.log("[Statistics Banner Two] countedClick network " + data.network);
						}}
					/>
				</ScrollView>
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
	scroll: {
		alignSelf: 'stretch'
	},
	multiAdContainer: {
		flex: 1,
		height: 300
	},
	welcome: {
		flexDirection: 'row',
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		marginBottom: 5,
	},
	banner: {
		backgroundColor: 'rgb(0, 0, 255)',
		width: 320,
		height: 53
	},
	multisizeBanner: {
		backgroundColor: 'rgb(0, 0, 100)',
		width: 320,
		height: 53
	},
	nativeAd: {
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: 'rgb(255, 255, 255)',
		height: 300
	}
});