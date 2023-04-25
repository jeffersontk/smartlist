import React, { useState, useEffect } from "react";
import ItemCheck from "../../components/ItemCheck";
import { VStack, FlatList, View, Center, Text } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { ListSkeleton } from "../../components/ListSkeleton";
import Header from "../../components/Header";

import IconEntypo from "react-native-vector-icons/Entypo";

interface CategoriesProps {
  category: any;
}
interface Product {
  checkboxName: string;
  id: string;
  inputNamePrice: string;
  inputNameQuantity: string;
  name: string;
}

export default function Categories({ category }: CategoriesProps) {
  const methods = useForm();
  const [listProducts, setListProducts] = useState<any[]>([]);
  const [lastProduct, setLastProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = (id?: string) => {
    setIsLoading(true);
    const url = id
      ? `http://192.168.1.110:3333/${category}?lastId=${id}`
      : `http://192.168.1.110:3333/${category}`;
    axios
      .get(url)
      .then((response) => {
        const products = response.data.products;
        setListProducts([...listProducts, ...products]);
        setLastProduct(products.slice(-1)[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("deu chabu", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (listProducts.length === 0) {
    return (
      <VStack flex={1} w="100%" pb="5">
        <Header />
        <VStack h="69.8%" alignItems="center" justifyContent="center">
          <IconEntypo name="list" size={64} color="#7C7C8A" />
          <Text color="#7C7C8A" fontSize={24}>
            Carrinho vazio
          </Text>
        </VStack>
      </VStack>
    );
  }
  return (
    <View flex={1} w="100%">
      <VStack w="100%" px="5" h="100%" alignItems="center">
        <FormProvider {...methods}>
          <FlatList
            data={listProducts}
            keyExtractor={(product: any) => product.id.toString()}
            renderItem={({ item: product }) => (
              <ItemCheck
                key={product.id}
                id={product.id}
                title={product.name}
                inputNamePrice={product.inputNamePrice}
                inputNameQuantity={product.inputNameQuantity}
                checkBoxName={product.checkboxName}
              />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (lastProduct) {
                getCategories(lastProduct.id);
              }
            }}
            width="100%"
          />
        </FormProvider>
      </VStack>
    </View>
  );
}
