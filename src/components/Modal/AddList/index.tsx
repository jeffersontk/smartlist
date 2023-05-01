import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import { Modal } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useCart } from "../../../context/cartProvider";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
}

export default function ModalAddInList({
  isOpen,
  onClose,
  id,
  title,
}: modalProps) {
  const methods = useFormContext();
  const price = methods.watch(`${id}price`);
  const quantity = methods.watch(`${id}quantity`);
  const { addItem } = useCart();

  const handleConfirm = (data: any) => {
    if (+data[`${id}price`] > 0) {
      const checkedItems = Object.entries(data)
        .filter(([key, value]) => key.startsWith(id) && value)
        .map(() => {
          return {
            id,
            name: title,
            /*    quantity: data[`${id}quantity`],
            price: data[`${id}price`], */
            quantity,
            price,
          };
        });
      if (checkedItems.length > 0) {
        addItem(checkedItems);
      }
    }

    onClose();
  };

  return (
    <View flex={1}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}
      >
        <VStack flex={1} justifyContent="center" alignItems="center" px="5">
          <View maxW={320}>
            <HStack
              bg="#219653"
              p="4"
              borderTopRadius={8}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="white" fontFamily="heading" fontSize="lg">
                {title}
              </Text>
            </HStack>
            <VStack
              p="4"
              bg="white"
              space={5}
              borderBottomRadius={8}
              shadow={"4"}
            >
              <HStack flexDirection="row" space={2}>
                <FormControl maxW="48%">
                  <FormControl.Label>Preço</FormControl.Label>
                  <Controller
                    control={methods.control}
                    name={`${id}price`}
                    defaultValue={"0"}
                    render={({ field }) => (
                      <Input
                        keyboardType="numeric"
                        onChangeText={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </FormControl>

                <FormControl maxW="48%">
                  <FormControl.Label>Quantidade</FormControl.Label>
                  <Controller
                    control={methods.control}
                    name={`${id}quantity`}
                    defaultValue={"1"}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </HStack>
              <Button.Group>
                <Button
                  w="100%"
                  bg="green.700"
                  onPress={methods.handleSubmit(handleConfirm)}
                  aria-label="Confirmar"
                  isDisabled={!methods.formState.isValid}
                >
                  Confirmar
                </Button>
              </Button.Group>
            </VStack>
          </View>
        </VStack>
      </Modal>
    </View>
  );
}
