import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "./src/context/cartProvider";
import Routes from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
          <StatusBar style="auto" />
          <Routes />
        </CartProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
