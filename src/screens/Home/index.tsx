import React from "react";
import { VStack } from "native-base";
import { DrawerRouter } from "../../routes/drawer.route";

export default function Home() {
  return (
    <VStack flex={1} w="100%">
      <DrawerRouter />
    </VStack>
  );
}
