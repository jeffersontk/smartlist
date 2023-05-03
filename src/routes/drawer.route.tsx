import { createDrawerNavigator } from "@react-navigation/drawer";
import Categories from "../screens/Categories";
import { DrawerContent } from "../components/Custom/DrawerContent";
import { memo } from "react";

const { Navigator, Screen } = createDrawerNavigator();

const MemoizedCategories = memo(Categories);

export function DrawerRouter() {
  return (
    <Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 240,
          color: "#f1f1f1",
        },
        drawerLabelStyle: {
          color: "#f1f1f1",
        },
        drawerPosition: "right",
        drawerActiveBackgroundColor: "#6FCF97",
        header: () => null,
      })}
      drawerContent={DrawerContent}
    >
      <Screen
        name="Mercearia"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="grocery"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Condimentos"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="condiments"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Proteínas"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="protein"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Lacticínios & Frios"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="dairyandcold"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Doces"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="candy"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Congelados"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="frozen"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Hortifruti"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="hortifruti"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Descartáveis"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="disposable"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Higiene pessoal"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="personalHygiene"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Produtos de limpeza"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="cleaningProducts"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Produtos de Bebê"
        children={({ navigation, route }) => (
          <MemoizedCategories
            category="babyProducts"
            navigation={navigation}
            route={route}
          />
        )}
      />
    </Navigator>
  );
}
