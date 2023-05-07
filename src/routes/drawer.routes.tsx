import { createDrawerNavigator } from "@react-navigation/drawer";

import Categories from "../screens/Categories";
import { DrawerContent } from "../components/Custom/DrawerContent";

const { Navigator, Screen } = createDrawerNavigator();

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
      initialRouteName="Mercearia"
    >
      <Screen
        name="Mercearia"
        component={Categories}
        initialParams={{category: "grocery"}}
      />
      <Screen
        name="Condimentos"
        component={Categories}
        initialParams={{category: "condiments"}}
      />
      <Screen
        name="Proteínas"
        component={Categories}
        initialParams={{category: "protein"}}
      />
      <Screen
        name="Lacticínios & Frios"
        component={Categories}
        initialParams={{category: "dairyandcold"}}
      
      />
      <Screen
        name="Doces"
        component={Categories}
        initialParams={{category: "candy"}}
      />
      <Screen
        name="Congelados"
        component={Categories}
        initialParams={{category: "frozen"}}
      />
      <Screen
        name="Hortifruti"
        component={Categories}
        initialParams={{category: "hortifruti"}}
      />
      <Screen
        name="Descartáveis"
        component={Categories}
        initialParams={{category: "disposable"}}
      />
      <Screen
        name="Higiene pessoal"
        component={Categories}
        initialParams={{category: "personalHygiene"}}
     
      />
      <Screen
        name="Produtos de limpeza"
        component={Categories}
        initialParams={{category: "cleaningProducts"}}
      />
      <Screen
        name="Produtos de Bebê"
        component={Categories}
        initialParams={{category: "babyProducts"}}
   
      />
    </Navigator>
  );
}
