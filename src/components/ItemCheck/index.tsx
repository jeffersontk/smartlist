import { Text, Button, HStack, View, VStack } from "native-base";
import React, { useRef, useState, memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "react-native-vector-icons/Feather";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

interface props {
  swipeableRef: any;
  price: number;
  quantity: number;
  currentQuantity: number;
  title: string;
  isDisabled: boolean;
  showQuantityAndPrice: boolean;
  showCurrentQuantity: boolean;
  handleRemoveItem: () => void;
  handleEnable: () => void;
  handleOpenAddToList: () => void;
  handleOpenIHaveAtHome: () => void;
}

function ItemCheckComponent({
  title,
  currentQuantity,
  price,
  quantity,
  swipeableRef,
  isDisabled,
  handleRemoveItem,
  handleEnable,
  handleOpenAddToList,
  handleOpenIHaveAtHome,
  showCurrentQuantity,
  showQuantityAndPrice,
}: props) {
  const LeftSwipeActions = useCallback(() => {
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
        background={!isDisabled ? "red.500" : "green.600"}
        h="100%"
        mr="2"
        onPress={!isDisabled ? handleOpenIHaveAtHome : handleEnable}
      >
        <Text color="white" width={70} textAlign="center" bold>
          {!isDisabled ? "Tenho em casa" : "Desmarcar"}
        </Text>
      </Button>
    );
  }, []);

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
                  strikeThrough={isDisabled}
                  color={isDisabled ? "gray.400" : "gray.700"}
                >
                  {title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleOpenAddToList}
                disabled={isDisabled}
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
    </>
  );
}

export const ItemCheck = memo(ItemCheckComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
