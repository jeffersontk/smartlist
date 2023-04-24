import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "../components/Header";
import Categories from "../screens/Categories";
import { DrawerContent } from "../components/Custom/DrawerContent";

const Drawer = createDrawerNavigator();

export function DrawerRouter() {
  return (
    <Drawer.Navigator
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
        header: () => <Header navigation={navigation} title={route.name} />,
      })}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen
        name="Mercearia"
        children={() => <Categories category="grocery" />}
      />
      <Drawer.Screen
        name="Condimentos"
        children={() => <Categories category="condiments" />}
      />
    </Drawer.Navigator>
  );
}
