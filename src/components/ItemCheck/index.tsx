import {
  Pressable,
  Checkbox,
  Text,
  Modal,
  FormControl,
  Input,
  Button,
  HStack,
  View,
} from "native-base";
import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

import { useCart } from "../../context/cartProvider";
import { styles } from "./styles";

interface props {
  id: string;
  title: string;
  inputNamePrice: string;
  inputNameQuantity: string;
  checkBoxName: string;
}

const START = 0;
const LIMIT = Dimensions.get("window").width - 350;

export default function ItemCheck({
  id,
  title,
  inputNamePrice,
  inputNameQuantity,
  checkBoxName,
}: props) {
  const methods = useFormContext();
  const { addItem, removeItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const price = methods.watch(inputNamePrice);
  const quantity = methods.watch(inputNameQuantity);
  const confirmed = methods.watch(checkBoxName);
  const isVisibleDetails = price !== "0" && quantity && confirmed;

  const handleConfirm = (data: any) => {
    console.log("data", data);
    const checkedItems = Object.entries(data)
      .filter(([key, value]) => key.startsWith("check") && value)
      .map(([key]) => {
        const item = key.replace("check", "");
        let quantity = 1;

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
        const price = parseFloat(priceValue) || 0;
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
      removeItem(id);
    }
  }, [confirmed]);

  const position = useSharedValue(0);

  const directionRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      position.value = withTiming(LIMIT, { duration: 500 });
      setShowButton(true);
    });
  const directionLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      position.value = withTiming(START, { duration: 500 });
      setShowButton(false);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View width="100%">
      <HStack>
        <Button
          display={showButton ? "block" : "none"}
          background="green.600"
          h="60"
          mr="2"
        >
          <Text color="white" width={60} textAlign="center">
            Tenho em casa
          </Text>
        </Button>
        <GestureDetector
          gesture={Gesture.Exclusive(directionRight, directionLeft)}
        >
          <Animated.View style={[animatedStyle, styles.container]}>
            <HStack
              alignItems="center"
              h="60"
              px="5"
              justifyContent="space-between"
            >
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
          </Animated.View>
        </GestureDetector>
      </HStack>
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
    </View>
  );
}
