import { FlatList, Text, VStack, View } from "native-base";
import React, { useState } from "react";
import IconEntypo from "react-native-vector-icons/Entypo";
import { Product } from "../Product";
import { ListSkeleton } from "../ListSkeleton";

interface Product {
  id: string;
  name: string;
}

interface ProductListProsp {
  data: any;
  isLoading: boolean;
}

export default function ProductList({ data, isLoading }: ProductListProsp) {
  const [lastProduct, setLastProduct] = useState<Product>();

  const handleContentSizeChange = () => {
    const lastIndex = data.length - 1;
    const lastItem = data[lastIndex];
    setLastProduct(lastItem);
  };
  if (isLoading) {
    return <ListSkeleton />;
  }
  return (
    <VStack w="100%" px="5" h="90%" pb="50" alignItems="center">
      <FlatList
        data={data}
        letterSpacing={4}
        keyExtractor={(product: any) => product.id.toString()}
        renderItem={({ item: product }) => (
          <Product key={product.id} id={product.id} title={product.name} />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        maxHeight="85%"
        paddingBottom="15"
        ListEmptyComponent={() =>
          !isLoading ? (
            <VStack flex={1} w="100%" pb="5">
              <VStack h="69.8%" alignItems="center" justifyContent="center">
                <IconEntypo name="list" size={64} color="#7C7C8A" />
                <Text color="#7C7C8A" fontSize={24}>
                  lista vazio
                </Text>
              </VStack>
            </VStack>
          ) : (
            <View />
          )
        }
      />
    </VStack>
  );
}
