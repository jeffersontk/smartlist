import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./app.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
