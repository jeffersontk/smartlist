import React, { useState, useEffect } from "react";
import { Product } from "../../components/ItemCheck";
import { VStack, FlatList, View, Text } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { ListSkeleton } from "../../components/ListSkeleton";
import Header from "../../components/Header";

import IconEntypo from "react-native-vector-icons/Entypo";

interface CategoriesProps {
  category: any;
  navigation: any;
  route: any;
}

interface Product {
  checkboxName: string;
  id: string;
  inputNamePrice: string;
  inputNameQuantity: string;
  name: string;
}

export default function Categories({
  category,
  navigation,
  route,
}: CategoriesProps) {
  const methods = useForm();
  const [listProducts, setListProducts] = useState<any[]>([]);
  const [lastProduct, setLastProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const { watch } = methods;

  const searchProduct: string = watch("searchProduct");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (searchProduct && searchProduct.length > 0) {
      const filtered = listProducts.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(listProducts);
    }
  }, [searchProduct, listProducts]);

  const productList =
    searchProduct && searchProduct.length > 0
      ? filteredProducts
      : listProducts || [];

  const handleContentSizeChange = () => {
    const lastIndex = listProducts.length - 1;
    const lastItem = listProducts[lastIndex];
    setLastProduct(lastItem);
  };

  const getCategories = (id?: string) => {
    setIsLoading(true);
    const url = id
      ? `https://expressjs-server-production-4171.up.railway.app/products?category=${category}&lastId=${id}`
      : `https://expressjs-server-production-4171.up.railway.app/products?category=${category}`;
    axios
      .get(url)
      .then((response) => {
        const products = response.data.products;
        const newProducts = products.filter((p: any) => {
          return listProducts.findIndex((lp) => lp.id === p.id) === -1;
        });

        setIsLoading(false);
        setListProducts([...listProducts, ...newProducts]);
      })
      .catch((error) => {
        console.error("deu chabu", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <VStack flex={1} w="100%">
      <FormProvider {...methods}>
        <Header navigation={navigation} title={route.name} />

        <VStack w="100%" px="5" h="90%" pb="50" alignItems="center">
          <FlatList
            data={productList}
            letterSpacing={4}
            keyExtractor={(product: any) => product.id.toString()}
            renderItem={({ item: product }) => (
              <Product key={product.id} id={product.id} title={product.name} />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={handleContentSizeChange}
            onEndReached={() => {
              if (lastProduct) {
                getCategories(lastProduct.id);
              }
            }}
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
            ListFooterComponent={() =>
              isLoading ? <ListSkeleton /> : <View pb="5" />
            }
          />
        </VStack>
      </FormProvider>
    </VStack>
  );
}
