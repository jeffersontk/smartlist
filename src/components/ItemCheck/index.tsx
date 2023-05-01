import {
  Checkbox,
  Text,
  Button,
  HStack,
  View,
  VStack,
  useDisclose,
} from "native-base";
import React, { useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "react-native-vector-icons/Feather";

import { Swipeable } from "react-native-gesture-handler";

import { useCart } from "../../context/cartProvider";

import ModalAddInList from "../Modal/AddList";
import ModalIHaveAtHome from "../Modal/IHaveAtHome";
import { TouchableOpacity } from "react-native";

interface props {
  id: string;
  title: string;
}

export function Product({ id, title }: props) {
  const methods = useFormContext();
  const { removeItem } = useCart();
  const {
    isOpen: isOpenAddList,
    onClose: onCloseAddList,
    onOpen: onOpenAddList,
  } = useDisclose();
  const {
    isOpen: isOpenIHaveAtHome,
    onClose: onCloseIHaveAtHome,
    onOpen: onOpenIHaveAtHome,
  } = useDisclose();
  const [disableItem, setDisableItem] = useState(false);
  const swipeableRef = useRef<any>(null);

  const price = methods.watch(`${id}price`);
  const quantity = methods.watch(`${id}quantity`);
  const [showQuantityAndPrice, setShowQuantityAndPrice] = useState(false);
  const [showCurrentQuantity, setShowCurrentQuantity] = useState(false);

  const currentQuantity = methods.watch(`${id}currentQuantity`);

  const handleINeedToBuy = () => {
    setShowCurrentQuantity(true);
    onCloseIHaveAtHome();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleIDontNeedToBuy = () => {
    setDisableItem(!disableItem);
    if (price && +price <= 0) {
      methods.setValue(`${id}price`, 0);
    }
    if (currentQuantity && +currentQuantity <= 0) {
      setShowCurrentQuantity(true);
    }
    removeItem(id);
    onCloseIHaveAtHome();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleEnable = () => {
    setDisableItem(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleRemoveItem = () => {
    removeItem(id);
    methods.setValue(`${id}price`, "0");
    setShowQuantityAndPrice(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleOpenAddToList = () => {
    if (!disableItem || +price == 0) {
      onOpenAddList();
    }
  };

  useMemo(() => {
    if (price != null && +price > 0) {
      setShowQuantityAndPrice(true);
    }
  }, [price]);

  const LeftSwipeActions = () => {
    if (showQuantityAndPrice) {
      return (
        <Button
          background={"red.500"}
          h="100%"
          mr="2"
          onPress={handleRemoveItem}
        >
          <Text color="white" width={70} textAlign="center" bold>
            remover
          </Text>
        </Button>
      );
    }
    return (
      <Button
        background={!disableItem ? "red.500" : "green.600"}
        h="100%"
        mr="2"
        onPress={!disableItem ? onOpenIHaveAtHome : handleEnable}
      >
        <Text color="white" width={70} textAlign="center" bold>
          {!disableItem ? "Tenho em casa" : "Desmarcar"}
        </Text>
      </Button>
    );
  };

  return (
    <>
      <HStack w="100%" mb="5">
        <Swipeable ref={swipeableRef} renderLeftActions={LeftSwipeActions}>
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
              <TouchableOpacity
                onPress={handleOpenAddToList}
                disabled={disableItem}
              >
                {showQuantityAndPrice ? (
                  <Icon name="check-square" size={28} color="#219653" />
                ) : (
                  <Icon name="square" size={28} color="#c4c4c4" />
                )}
              </TouchableOpacity>
            </HStack>
            {showQuantityAndPrice && (
              <HStack justifyContent="space-between" mb="2">
                <Text color="gray.500">Quant: {quantity}</Text>
                <Text color="gray.500">
                  Preço unidade:
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(price)}
                </Text>
              </HStack>
            )}
            {showCurrentQuantity && currentQuantity > 0 && (
              <HStack justifyContent="space-between" mb="2">
                <Text color="gray.500">
                  Quantidade em casa: {currentQuantity}
                </Text>
              </HStack>
            )}
          </VStack>
        </Swipeable>
      </HStack>
      <ModalAddInList
        id={id}
        onClose={onCloseAddList}
        isOpen={isOpenAddList}
        title={title}
      />
      <ModalIHaveAtHome
        id={id}
        isOpen={isOpenIHaveAtHome}
        onClose={onCloseIHaveAtHome}
        action1={handleIDontNeedToBuy}
        action2={handleINeedToBuy}
      />
    </>
  );
}

/* export const Product = memo(ProductComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
}); */
