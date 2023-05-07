import { DrawerNavigationProp } from '@react-navigation/drawer';
export declare global {
    namespace ReactNavigation{
        interface RootParamList {
            list: {
                category: string
            },
            myCart: undefined
        }
    }
}