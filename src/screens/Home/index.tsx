import React from "react";
import { VStack, Center } from "native-base";
import { DrawerRouter } from "../../routes/drawer.route";
import CartCurrentPrice from "../../components/CartCurrentPrice";

export default function Home() {
  return (
    <VStack flex={1} w="100%" pb="5">
      <DrawerRouter />
      <Center pt="5">
        <CartCurrentPrice />
      </Center>
    </VStack>
  );
}
