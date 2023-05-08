import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRouter from "./tab.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <TabRouter />
    </NavigationContainer>
  );
}
