import { DrawerNavigationProp } from "@react-navigation/drawer";
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      myCart: undefined;
      list: {
        category: string;
      };
      Mercearia: { category: string };
      Condimentos: undefined;
      Proteina: undefined;
      "Lacticínios & Frios": undefined;
      Doces: undefined;
      Congelados: undefined;
      Hortifruti: undefined;
      Descartáveis: undefined;
      "Higiene pessoal": undefined;
      "Produtos de limpeza": undefined;
      "Produtos de Bebê": undefined;
    }
  }
}
