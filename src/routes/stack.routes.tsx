import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import Home from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="home" screenOptions={{ header: () => null }}>
      <Screen name="home" component={Home} />
      <Screen name="Mercearia" component={Categories} />
      <Screen name="Condimentos" component={Categories} />
      <Screen name="Proteina" component={Categories} />
      <Screen name="Lacticínios & Frios" component={Categories} />
      <Screen name="Doces" component={Categories} />
      <Screen name="Congelados" component={Categories} />
      <Screen name="Hortifruti" component={Categories} />
      <Screen name="Descartáveis" component={Categories} />
      <Screen name="Higiene pessoal" component={Categories} />
      <Screen name="Produtos de limpeza" component={Categories} />
      <Screen name="Produtos de Bebê" component={Categories} />
    </Navigator>
  );
}
