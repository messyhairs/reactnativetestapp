import * as React from 'react';
import { Text, View, StatusBar, styles } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, ThemeProvider } from 'react-native-elements';
import { Card, Avatar, Badge, ListItem, Icon, withBadge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Auth  from './components/auth';
import Post  from './components/post';
import Profile from './components/profile';
import EditPofile from './components/editprofiles';
import Notific from './components/notific';
import Notificat from './components/Notificat';
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Auth') {
                iconName = focused ? 'ios-home' : 'ios-home';
              } else if (route.name === 'Post') {
                iconName = focused ? 'ios-book' : 'ios-book';
              } 
              else if (route.name === 'Profile') {
                iconName = focused ? 'ios-people-circle' : 'ios-people-circle';
              }
              else if (route.name === 'Notificat') {
                iconName = focused ? 'ios-people-circle' : 'ios-people-circle';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>

            <Tab.Screen name="Auth" component={Auth} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Post" component={Post} />
            <Tab.Screen name="Notificat" component={Notificat} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>

    );
  }
}
