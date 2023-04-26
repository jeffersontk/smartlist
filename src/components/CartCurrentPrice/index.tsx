import { Text, Flex, HStack } from "native-base";
import React from "react";
import { useCart } from "../../context/cartProvider";

export default function CartCurrentPrice() {
  const { total } = useCart();

  return (
    <HStack
      rounded="full"
      bg="green.700"
      paddingY={4}
      paddingX={6}
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      w="100%"
    >
      <Text fontSize="xl" color="green.100">
        Total no carrinho
      </Text>
      <Text fontSize="2xl" color="green.100" fontWeight="normal">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total)}
      </Text>
    </HStack>
  );
}
