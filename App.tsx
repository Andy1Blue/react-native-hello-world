import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {MAP_TYPES, UrlTile} from 'react-native-maps';

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
};

const MapScreen = () => {
  const ASPECT_RATIO = 400 / 800;
  const LATITUDE = 50.720555;
  const LONGITUDE = 19.858633;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <MapView
      region={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={{flex: 1}}
      mapType={MAP_TYPES.STANDARD}
      rotateEnabled={false}
      provider={null}
      showsUserLocation>
      <UrlTile
        urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        maximumZ={19}
      />
    </MapView>
  );
};

const WebViewComponent = () => {
  return (
    <Container>
      <DynamicWebView
        source={{uri: 'https://google.com/'}}
        renderLoading={() => <Text>Loading</Text>}
      />
    </Container>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#ff0000"
        barStyle="dark-content"
        hidden={false}
      />
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="WebViewComponent"
          component={WebViewComponent}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const DynamicWebView = styled(WebView)`
  width: 100%;
  height: 100%;
`;

export default App;
