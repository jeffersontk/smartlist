import React, { useState, useEffect } from "react";
import { VStack } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { categories } from "../../data/categories";

export default function Categories() {
  const route = useRoute();

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
    if (route.params) {
      const url = `https://expressjs-server-production-4171.up.railway.app/products?category=${route.params}`;

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
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <VStack flex={1} w="100%">
      <FormProvider {...methods}>
        <Header data={categories} />
        <ProductList data={productList} isLoading={isLoading} />
      </FormProvider>
    </VStack>
  );
}
