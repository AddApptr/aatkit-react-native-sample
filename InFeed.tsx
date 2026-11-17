import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {
	RNAatkit,
	RNAatkitInFeedBanner
} from '@addapptr/react-native-aatkit'

export default class InFeed extends Component<{}> {
	
	constructor() {
		super();
		this.state = {
		  loading: false,
		  fakeServerData: [],
		  fetchingFromFakeServer: false,
		};
		this.offset = 0;
	}

	componentDidMount() {
		this.loadFakeData();
	}

	componentWillUnmount() {
		RNAatkit.cancelReloadingInFeedBannerPlacement("InFeed");
	}

	loadFakeData = () => {
		if (!this.state.fetchingFromFakeServer && this.offset < 5) {
		  this.setState({ fetchingFromFakeServer: true }, () => {
			var result = [];
			for(var i=this.offset * 10; i<this.offset * 10 + 10; i++) {
				result.push({
					id: i+1,
					title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				});
			}	

			this.setState({
				fakeServerData: [...this.state.fakeServerData, ...result],
				fetchingFromFakeServer: false,
			  });

			this.offset = this.offset + 1;
		  });
		}
	};

	renderFooter() {
		return (
		  <View style={styles.footer}>
			{this.state.fetchingFromFakeServer ? (
			  <ActivityIndicator color="black" style={{ margin: 15 }} />
			) : null}
		  </View>
		);
	}

	render() {
		return (
		  <View style={styles.container}>
			{this.state.loading ? (
			  <ActivityIndicator size="large" />
			) : (
			  <FlatList
				style={styles.flatList}
				keyExtractor={(_, index) => index.toString()}
				data={this.state.fakeServerData}
				onEndReached={() => this.loadFakeData()}
				onEndReachedThreshold={0.5}
				renderItem={({ item, index }) => (
				  <View style={styles.item}>
					<Text style={styles.text}>
					  {item.id}{'.'}{item.title}
					</Text>
					{item.id % 10 == 0 ? (
			  			<RNAatkitInFeedBanner
							reloadOnStart={true}
							name="InFeed" />
					) : null}
				  </View>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListFooterComponent={this.renderFooter.bind(this)} />
			)}
		  </View>
		);
	  }
	}

	const styles = StyleSheet.create({
		flatList: { 
			width: '100%' 
		},
		container: {
			flex: 1,
			paddingTop: 25,
			justifyContent: 'center',
			alignItems: 'center',
		},
		item: {
			padding: 8,
		},
		separator: {
			backgroundColor: 'grey',
			height: 0.7,
		},
		text: {
			color: 'black',
			fontSize: 14,
		},
		footer: {
			padding: 8,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});