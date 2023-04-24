import { Center, FlatList, HStack, Text, VStack, View } from "native-base";
import React from "react";
import CartCurrentPrice from "../../components/CartCurrentPrice";
import { useCart } from "../../context/cartProvider";
import SimpleHeader from "../../components/SimpleHeader";

export default function MyCart() {
  const { items } = useCart();
  return (
    <VStack flex={1} w="100%" alignItems="center" pb="5">
      <SimpleHeader />
      <VStack px="4" pb="4" h="70%">
        <HStack w="100%" my="4" justifyContent="space-around">
          <Text fontSize="lg" w="33%">
            Produto
          </Text>
          <Text fontSize="lg" w="33%" textAlign="center">
            Quantidade
          </Text>
          <Text fontSize="lg" w="33%" textAlign="center">
            Preço
          </Text>
        </HStack>
        <FlatList
          data={items}
          keyExtractor={(product: any) => product.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: product }) => (
            <HStack
              key={product.id}
              w="100%"
              justifyContent="space-around"
              borderBottomWidth={1}
              borderBottomColor="gray.300"
              paddingY={4}
            >
              <Text fontSize="lg" w="33%" isTruncated>
                {product.name}
              </Text>
              <Text fontSize="lg" w="33%" textAlign="center">
                {product.quantity}
              </Text>
              <Text fontSize="lg" w="33%" textAlign="center">
                {product.price}
              </Text>
            </HStack>
          )}
        />
      </VStack>
      <Center>
        <CartCurrentPrice />
      </Center>
    </VStack>
  );
}
