import React from "react";
import Logo from "../../assets/logo.svg";
import { VStack, Input, InputGroup, InputLeftAddon, HStack } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { Controller, useFormContext } from "react-hook-form";

export default function SimpleHeader() {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <VStack
      h={175}
      backgroundColor="#219653"
      borderBottomRightRadius={30}
      borderBottomLeftRadius={30}
      paddingTop={58}
      paddingX={5}
    >
      <HStack justifyContent="space-between" alignItems="center" mb="2">
        <Logo />
      </HStack>
      <InputGroup
        w={{
          base: "90%",
        }}
      >
        <InputLeftAddon
          children={<Icon name="search" size={20} color="#219653" />}
          style={{
            backgroundColor: "white",
            height: 46,
            marginTop: 8,
            borderBottomLeftRadius: 40,
            borderTopLeftRadius: 40,
            paddingLeft: 15,
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              w={{
                base: "100%",
              }}
              mt="2"
              fontSize="md"
              color="green.500"
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bg="white"
              placeholder="Procurando algum produto em especifico"
              placeholderTextColor="green.500"
              borderLeftWidth={0}
              _focus={{
                bg: "white",
                borderWidth: 1,
                borderColor: "green.500",
              }}
            />
          )}
          name="searchProduct"
        />
      </InputGroup>
    </VStack>
  );
}
