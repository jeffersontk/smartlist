import React from "react";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import IconEntypo from "react-native-vector-icons/Entypo";
import MyCart from "../screens/MyCart";
import { DrawerRouter } from "./drawer.routes";

type AppRoutes = {
  list: undefined;
  myCart: undefined;
};


export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


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
      initialRouteName="list"
    >
      <Screen
        name="list"
        component={DrawerRouter}
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
    </Navigator>
  );
}
