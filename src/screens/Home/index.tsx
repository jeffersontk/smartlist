import React, { useState, useMemo } from "react";
import ItemCheck from "../../components/ItemCheck";
import { VStack, FlatList } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { usePrice } from "../../hooks/useCart";

interface OriginalObj {
  [key: string]: string | boolean;
}

interface OrganizedObj {
  [key: string]: any;
  name: string;
  check: boolean;
  price: number;
  qnt: number;
}

export default function Home({ route }: any) {
  const getItemLayout = (_: any, index: any) => ({
    length: 40,
    offset: 40 * index,
    index,
  });
  const methods = useForm();
  const { setPrice } = usePrice();

  const [cartProduct, setCartProduct] = useState<any[]>();

  function calculateTotalPrice(organizedArr: any[]): number {
    return organizedArr.reduce((totalPrice: number, product: OrganizedObj) => {
      return totalPrice + +product.price * +product.qnt;
    }, 0);
  }

  const handleCheckInList = (obj: any) => {
    console.log("handleCheckInList", obj);
    /*    const keys = Object.keys(obj);
    const organizedArr: OrganizedObj[] = [];

    keys.forEach((key: string) => {
      if (key.startsWith("check")) {
        const name = key.replace("check", "") as string;
        const check = obj[key] == true;
        const priceKey = `price${name}`;
        const price = parseFloat(obj[priceKey]);
        const qntKey = `qnt${name}`;
        const qnt = parseInt(obj[qntKey]);
        organizedArr.push({ name, check, price, qnt });
      }
    });
    setCartProduct(organizedArr); */
  };

  useMemo(() => {
    if (cartProduct) {
      const cartPrice = calculateTotalPrice(cartProduct);
      setPrice(cartPrice);
    }
  }, [cartProduct]);

  return (
    <VStack flex={1} w="100%" alignItems="center">
      <FormProvider {...methods}>
        <FlatList
          data={route?.params.products}
          keyExtractor={(product: any) => product.id.toString()}
          renderItem={({ item: product }) => (
            <ItemCheck
              key={product.id}
              title={product.name}
              inputNamePrice={product.inputNamePrice}
              inputNameQuantity={product.inputNameQuantity}
              checkBoxName={product.checkboxName}
              onCheckInList={methods.handleSubmit(handleCheckInList)}
            />
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          extraData={route?.params.products}
          getItemLayout={getItemLayout}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </FormProvider>
    </VStack>
  );
}
