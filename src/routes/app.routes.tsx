import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import IconEntypo from "react-native-vector-icons/Entypo";
import Home from "../screens/Home";
import MyCart from "../screens/MyCart";
const { Navigator, Screen } = createBottomTabNavigator();
export default function AppRouter() {
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
    >
      <Screen
        name="List"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconEntypo name="list" size={30} color={color} />
          ),
        }}
      />
      <Screen
        name="MyCart"
        component={MyCart}
        options={{
          tabBarIcon: ({ color }) => (
            <IconEntypo name="shopping-cart" size={30} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
