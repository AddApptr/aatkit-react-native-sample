import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import ReuseBannerScreen from './ReuseBannerScreen';
import ReuseBannerScreen2 from './ReuseBannerScreen2';
import MRECBanner from './MRECBanner';
import InFeed from './InFeed';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const MainApp = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={App} />
      <Stack.Screen name="ReuseBannerScreen" component={ReuseBannerScreen} />
      <Stack.Screen name="ReuseBannerScreen2" component={ReuseBannerScreen2} />
      <Stack.Screen name="MRECBanner" component={MRECBanner} />
      <Stack.Screen name="InFeed" component={InFeed} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => MainApp);