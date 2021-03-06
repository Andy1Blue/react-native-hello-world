import React, {useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {MAP_TYPES, Marker, UrlTile} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
};

const MapScreen = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  Geolocation.getCurrentPosition(gps => {
    console.log(gps);
    setCurrentPosition({
      latitude: gps.coords.latitude,
      longitude: gps.coords.longitude,
    });
  });
  return (
    <MapView
      region={{
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{flex: 1}}
      mapType={MAP_TYPES.STANDARD}
      rotateEnabled={false}
      provider={null}
      showsUserLocation>
      <UrlTile
        urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      <Marker
        key={0}
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        title="Marker title"
        description="Marker desc"
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
