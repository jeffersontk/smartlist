import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "../components/Header";
import Categories from "../screens/Categories";
import { DrawerContent } from "../components/Custom/DrawerContent";
import CartCurrentPrice from "../components/CartCurrentPrice";
import { Center } from "native-base";

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerRouter() {
  return (
    <Navigator
      screenOptions={({ navigation, route }) => ({
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
          <Categories
            category="grocery"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Condimentos"
        children={({ navigation, route }) => (
          <Categories
            category="condiments"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Proteínas"
        children={({ navigation, route }) => (
          <Categories
            category="protein"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Lacticínios & Frios"
        children={({ navigation, route }) => (
          <Categories
            category="dairyandcold"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Doces"
        children={({ navigation, route }) => (
          <Categories category="candy" navigation={navigation} route={route} />
        )}
      />
      <Screen
        name="Congelados"
        children={({ navigation, route }) => (
          <Categories category="Frozen" navigation={navigation} route={route} />
        )}
      />
      <Screen
        name="Hortifruti"
        children={({ navigation, route }) => (
          <Categories
            category="hortifruti"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Descartáveis"
        children={({ navigation, route }) => (
          <Categories
            category="disposable"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Higiene pessoal"
        children={({ navigation, route }) => (
          <Categories
            category="personalHygiene"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Produtos de limpeza"
        children={({ navigation, route }) => (
          <Categories
            category="cleaningProducts"
            navigation={navigation}
            route={route}
          />
        )}
      />
      <Screen
        name="Produtos de Bebê"
        children={({ navigation, route }) => (
          <Categories
            category="babyProducts"
            navigation={navigation}
            route={route}
          />
        )}
      />
    </Navigator>
  );
}
