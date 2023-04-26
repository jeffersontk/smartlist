import { Checkbox, Text, Button, HStack, View, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, Controller, useForm } from "react-hook-form";

import { Swipeable } from "react-native-gesture-handler";

import { useCart } from "../../context/cartProvider";

import ModalAddInList from "../Modal";

interface props {
  id: string;
  title: string;
  inputNamePrice: string;
  inputNameQuantity: string;
  checkBoxName: string;
}

export default function ItemCheck({
  id,
  title,
  inputNamePrice,
  inputNameQuantity,
  checkBoxName,
}: props) {
  const methods = useForm();
  const { removeItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [disableItem, setDisableItem] = useState(false);
  const swipeableRef = useRef<any>(null);

  const price = methods.watch(inputNamePrice);
  const quantity = methods.watch(inputNameQuantity);
  const confirmed = methods.watch(checkBoxName);
  const isVisibleDetails = price !== "0" && quantity && confirmed;

  useEffect(() => {
    if (confirmed) {
      setShowModal(true);
    } else {
      removeItem(id);
    }
  }, [confirmed]);

  const handleDisableItem = () => {
    setDisableItem(!disableItem);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const LeftSwipeActions = () => {
    return (
      <Button
        background={!disableItem ? "red.500" : "green.600"}
        h="58"
        mr="2"
        mt="0.5"
        onPress={handleDisableItem}
      >
        <Text color="white" width={70} textAlign="center" bold>
          {!disableItem ? "Tenho em casa" : "Desmarcar"}
        </Text>
      </Button>
    );
  };

  return (
    <FormProvider {...methods}>
      <HStack w="100%" mb="5">
        <Swipeable
          ref={swipeableRef}
          renderLeftActions={LeftSwipeActions}
          onSwipeableOpen={() => handleDisableItem}
        >
          <VStack
            w="100%"
            maxW={360}
            bg="#F2F2F2"
            px="5"
            borderWidth={1}
            borderColor="gray.300"
            borderRadius={8}
          >
            <HStack
              alignItems="center"
              h="60"
              w="full"
              justifyContent="space-between"
            >
              <View>
                <Text
                  fontSize="md"
                  strikeThrough={disableItem}
                  color={disableItem ? "gray.400" : "gray.700"}
                >
                  {title}
                </Text>
              </View>
              <Controller
                control={methods.control}
                name={checkBoxName}
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    colorScheme="green"
                    size="md"
                    aria-label="Confirmar seleção do produto"
                    value={value}
                    isDisabled={disableItem}
                    onChange={onChange}
                  />
                )}
              />
            </HStack>
            {isVisibleDetails && (
              <HStack justifyContent="space-between" mb="2">
                <Text color="gray.500">Quantidade: {quantity}</Text>
                <Text color="gray.500">Preço unidade: R${price}</Text>
              </HStack>
            )}
          </VStack>
        </Swipeable>
      </HStack>
      <ModalAddInList
        id={id}
        inputNamePrice={inputNamePrice}
        inputNameQuantity={inputNameQuantity}
        setShowModal={setShowModal}
        showModal={showModal}
        title={title}
      />
    </FormProvider>
  );
}
