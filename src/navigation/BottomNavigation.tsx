import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../theme/Colors';
import ProfileScreen from '../features/profile/ProfileScreen';
import {Styles} from '../theme';
import IconButtonTab from '../components/IconBottomTab/IconButtonTab';
import ServiceScreen from '../features/service/ServiceScreen';
import VolunteeringScreen from '../features/volunteering/VolunteeringScreen';
import { HomeTabParamList } from './stacks/RootStackParamList';
import PetScreen from '../features/pet/PetScreen';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

const BottomNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: Styles.tabBarStyle,
        tabBarShowLabel: false,
      })}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButtonTab
              focused={focused}
              label="Home"
              icon={
                <Ionicons
                  name="home-outline"
                  size={20}
                  color={focused ? '#ffff' : Colors.darkLiver}
                />
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pet"
        component={PetScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButtonTab
              focused={focused}
              label="Pet"
              icon={
                <MaterialCommunityIcons
                  name="paw"
                  size={25}
                  color={focused ? '#ffff' : Colors.darkLiver}
                />
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButtonTab
              focused={focused}
              label="Service"
              icon={
                <MaterialCommunityIcons
                  name="dns-outline"
                  size={25}
                  color={focused ? '#ffff' : Colors.darkLiver}
                />
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Volunteering"
        component={VolunteeringScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButtonTab
              focused={focused}
              label="Volunteering"
              icon={
                <MaterialCommunityIcons
                  name="hand-heart"
                  size={25}
                  color={focused ? '#ffff' : Colors.darkLiver}
                />
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButtonTab
              focused={focused}
              label="Profile"
              icon={
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={focused ? '#ffff' : Colors.darkLiver}
                />
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
