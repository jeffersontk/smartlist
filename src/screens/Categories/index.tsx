import React, { useState, useEffect } from "react";
import ItemCheck from "../../components/ItemCheck";
import { VStack, FlatList, View } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { ListSkeleton } from "../../components/ListSkeleton";

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

  const getCategories = (id?: string) => {
    if (id) {
      axios
        .get(`http://192.168.1.110:3333/${category}?lastId=${id}`)
        .then((response) => {
          const products = response.data.products;
          setListProducts([...listProducts, ...products]);
          setLastProduct(products.slice(-1)[0]);
        })
        .catch((error) => {
          console.error("deu chabu", error);
        });
    } else {
      axios
        .get(`http://192.168.1.110:3333/${category}`)
        .then((response) => {
          const products = response.data.products;
          setListProducts([...listProducts, ...products]);
          setLastProduct(products.slice(-1)[0]);
        })
        .catch((error) => {
          console.error("deu chabu", error);
        });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getItemLayout = (_: any, index: any) => ({
    length: 40,
    offset: 40 * index,
    index,
  });

  if (listProducts.length == 0) {
    return <ListSkeleton />;
  }

  return (
    <View flex={1} w="100%">
      <VStack h="100%" alignItems="center">
        <FormProvider {...methods}>
          <FlatList
            data={listProducts}
            keyExtractor={(product: any) => product.id.toString()}
            renderItem={({ item: product }) => (
              <ItemCheck
                key={product.id}
                title={product.name}
                inputNamePrice={product.inputNamePrice}
                inputNameQuantity={product.inputNameQuantity}
                checkBoxName={product.checkboxName}
              />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            getItemLayout={getItemLayout}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (lastProduct) {
                getCategories(lastProduct.id);
              }
            }}
          />
        </FormProvider>
      </VStack>
    </View>
  );
}
