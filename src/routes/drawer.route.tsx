import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "../components/Header";
import Categories from "../screens/Categories";
import { DrawerContent } from "../components/Custom/DrawerContent";

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
        header: () => <Header navigation={navigation} title={route.name} />,
      })}
      drawerContent={DrawerContent}
    >
      <Screen
        name="Mercearia"
        children={() => <Categories category="grocery" />}
      />
      <Screen
        name="Condimentos"
        children={() => <Categories category="condiments" />}
      />
    </Navigator>
  );
}