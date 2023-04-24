import { TouchableOpacity } from "react-native";

import {
  Pressable,
  Checkbox,
  Text,
  Flex,
  Modal,
  FormControl,
  Input,
  Button,
  HStack,
  View,
} from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useCart } from "../../context/cartProvider";

interface props {
  title: string;
  inputNamePrice: string;
  inputNameQuantity: string;
  checkBoxName: string;
}

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

export default function ItemCheck({
  title,
  inputNamePrice,
  inputNameQuantity,
  checkBoxName,
}: props) {
  const methods = useFormContext();
  const { addItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [currentCart, setCurrentCart] = useState<any[]>([]);

  const price = methods.watch(inputNamePrice);
  const quantity = methods.watch(inputNameQuantity);
  const confirmed = methods.watch(checkBoxName);
  const isVisibleDetails = price !== "0" && quantity && confirmed;

  const handleConfirm = (data: any) => {
    const checkedItems = Object.entries(data)
      .filter(([key, value]) => key.startsWith("check") && value)
      .map(([key]) => {
        const item = key.replace("check", "");
        const id = `item-${item}`;
        let quantity = 1;
        // Verifica se as chaves de quantidade e preço existem no objeto data
        if (
          data.hasOwnProperty(
            `qnt${item.charAt(0).toUpperCase()}${item.slice(1)}`
          )
        ) {
          const quantityValue =
            data[`qnt${item.charAt(0).toUpperCase()}${item.slice(1)}`];
          quantity = parseFloat(quantityValue) || 0;
        }
        const priceValue =
          data[`price${item.charAt(0).toUpperCase()}${item.slice(1)}`];
        const price = parseFloat(priceValue) || 0; // Alteração aqui
        return {
          id,
          name: title,
          quantity,
          price,
        };
      });

    if (checkedItems.length > 0) {
      addItem(checkedItems);
    }
    if (price !== 0 && price !== undefined && !isNaN(price)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      setShowModal(true);
    } else {
      setCurrentCart((current) =>
        current.filter((item) => item.name !== checkBoxName)
      );
    }
  }, [confirmed]);

  return (
    <>
      <Pressable
        rounded="8"
        overflow="hidden"
        borderWidth="1"
        borderColor="coolGray.300"
        bg="coolGray.100"
        width={380}
        p={4}
        mb={4}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <View>
            <Text fontSize="md">{title}</Text>
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
                onChange={onChange}
              />
            )}
          />
        </HStack>
        {isVisibleDetails && (
          <HStack justifyContent="space-between" mt="2">
            <Text color="gray.500">Quantidade: {quantity}</Text>
            <Text color="gray.500">Preço unidade: R${price}</Text>
          </HStack>
        )}
      </Pressable>

      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header bg="green.700">
            <Text color="white" fontFamily="heading" fontSize="lg">
              {title}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <HStack flexDirection="row" space={2}>
              <FormControl
                isRequired
                maxW="48%"
                isInvalid={!!methods.formState.errors[inputNamePrice]}
              >
                <FormControl.Label>Preço</FormControl.Label>
                <Controller
                  control={methods.control}
                  name={inputNamePrice}
                  defaultValue={price ?? "0"}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      keyboardType="numeric"
                      onChangeText={field.onChange}
                      value={field.value}
                      isInvalid={!!methods.formState.errors[inputNamePrice]}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {methods.formState.errors[inputNamePrice]?.message ||
                    "Campo obrigatório"}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl maxW="48%">
                <FormControl.Label>Quantidade</FormControl.Label>
                <Controller
                  control={methods.control}
                  name={inputNameQuantity}
                  defaultValue={quantity ?? "1"}
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
          </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
