import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text, VStack } from "native-base";

export const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#219653" }}>
      <VStack flex={1} space={4} px="4">
        <Text fontSize="xl" fontWeight="bold" color="gray.50">
          Categorias
        </Text>
        <DrawerItemList {...props} />
      </VStack>
    </DrawerContentScrollView>
  );
};
