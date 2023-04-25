import { Center, FlatList, HStack, Text, VStack } from "native-base";
import React from "react";
import CartCurrentPrice from "../../components/CartCurrentPrice";
import { useCart } from "../../context/cartProvider";
import SimpleHeader from "../../components/SimpleHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MyCart() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <VStack flex={1} w="100%" pb="5">
        <SimpleHeader />
        <VStack h="69.8%" alignItems="center" justifyContent="center">
          <Icon name="cart-off" size={64} color="#7C7C8A" />
          <Text color="#7C7C8A" fontSize={24}>
            Carrinho vazio
          </Text>
        </VStack>
        <Center>
          <CartCurrentPrice />
        </Center>
      </VStack>
    );
  }
  return (
    <VStack flex={1} w="100%" pb="5">
      <SimpleHeader />
      <VStack px="5" pb="4" h="69.8%" alignItems="center">
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
          ListEmptyComponent={() => (
            <VStack flex={1} w="100%" pb="5">
              <VStack h="69.8%" alignItems="center" justifyContent="center">
                <Icon name="cart-off" size={64} color="#7C7C8A" />
                <Text color="#7C7C8A" fontSize={24}>
                  Carrinho vazio
                </Text>
              </VStack>
            </VStack>
          )}
        />
      </VStack>
      <Center>
        <CartCurrentPrice />
      </Center>
    </VStack>
  );
}
