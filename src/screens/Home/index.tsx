import React from "react";
import { VStack, Text, View, Center } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerRouter } from "../../routes/DrawerRoute";
import CartCurrentPrice from "../../components/CartCurrentPrice";

export default function Home() {
  return (
    <View flex={1}>
      <DrawerRouter />
      <Center py="5" bg="#F2F2F2">
        <CartCurrentPrice />
      </Center>
    </View>
  );
}
