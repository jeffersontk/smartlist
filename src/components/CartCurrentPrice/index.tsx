import { Text, Flex } from "native-base";
import React from "react";
import { usePrice } from "../../hooks/useCart";

export default function CartCurrentPrice() {
  const { price } = usePrice();

  return (
    <Flex
      rounded="full"
      bg="green.700"
      paddingY={4}
      paddingX={6}
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      w="90%"
      mt="5"
      mb="5"
    >
      <Text fontSize="xl" color="green.100">
        Total no carrinho
      </Text>
      <Text fontSize="2xl" color="green.100" fontWeight="normal">
        R$ {price}
      </Text>
    </Flex>
  );
}
