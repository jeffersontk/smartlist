import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, useTheme } from "native-base";

import CartProvider from "./src/context/cartProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import MyCart from "./src/screens/MyCart";
import IconEntypo from "react-native-vector-icons/Entypo";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <CartProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator
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
            <Tab.Screen
              name="List"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconEntypo name="shopping-cart" size={30} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="MyCart"
              component={MyCart}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconEntypo name="list" size={30} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </NativeBaseProvider>
  );
}
