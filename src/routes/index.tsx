import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./tab.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
