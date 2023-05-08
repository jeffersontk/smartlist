import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import IconEntypo from "react-native-vector-icons/Entypo";
import MyCart from "../screens/MyCart";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { StackRoutes } from "./stack.routes";

type AppRoutes = {
  homeToTab: undefined;
  list: undefined;
  myCart: undefined;
  profile: undefined;
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export default function TabRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#6FCF97",
        tabBarStyle: {
          backgroundColor: "#219653",
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
      initialRouteName="homeToTab"
    >
      <Screen
        name="list"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <IconEntypo name="list" size={30} color={color} />
          ),
        }}
      />
      <Screen
        name="myCart"
        component={MyCart}
        options={{
          tabBarIcon: ({ color }) => (
            <IconEntypo name="shopping-cart" size={30} color={color} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <IconEntypo name="user" size={30} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
