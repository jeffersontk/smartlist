import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, View } from "native-base";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "./src/components/Header";
import List from "./src/data/list.json";
import CartCurrentPrice from "./src/components/CartCurrentPrice";
import { MyTabBar } from "./src/components/Custom/TabBar";
import PriceProvider from "./src/context/cartProvider";

const Tab = createMaterialTopTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text color="#000">Settings!</Text>
    </View>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <PriceProvider>
        <View flex={1} bg="#f2f2f2" alignItems="center">
          <Header></Header>
          <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
              {List.map((item) => (
                <Tab.Screen
                  key={item.id}
                  name={item.categorie}
                  component={Home}
                  initialParams={item}
                />
              ))}
            </Tab.Navigator>
          </NavigationContainer>

          <CartCurrentPrice />
        </View>
      </PriceProvider>
    </NativeBaseProvider>
  );
}
