import React, { useState, useEffect } from "react";
import { VStack, FlatList, View, Text } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { ListSkeleton } from "../../components/ListSkeleton";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

interface CategoriesProps {
  category: any;
  navigation: any;
  route: any;
}

export default function Categories({
  category,
  navigation,
  route,
}: CategoriesProps) {
  const methods = useForm();
  const [listProducts, setListProducts] = useState<any[]>([]);
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

  const getCategories = () => {
    setIsLoading(true);
    const url = `http://192.168.1.110:3000/products?category=${category}`;
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

        <ProductList data={productList} isLoading={isLoading} />
      </FormProvider>
    </VStack>
  );
}
