import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Playlist } from 'src/screens/Playlist';
import { Discovery } from 'src/icons/Discovery';
import { Text } from 'react-native';
import { Personal as PersonalIcon } from 'src/icons/Personal';
import Personal from 'src/screens/Personal';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#AB47BC',
        },
        tabBarStyle: {
          backgroundColor: '#FAFAFA',
        },
      }}>
      <Tab.Screen
        name="Discover"
        component={Playlist}
        options={{
          tabBarIcon: ({ focused }) => (
            <Discovery size={25} fill={focused ? '#AB47BC' : '#616161'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#AB47BC' : '#616161' }}>
              Khám phá
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Personal"
        component={Personal}
        options={{
          tabBarIcon: ({ focused }) => (
            <PersonalIcon size={25} fill={focused ? '#AB47BC' : '#616161'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#AB47BC' : '#616161' }}>
              Cá nhân
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
