import React from "react";
import Logo from "../../assets/logo.svg";
import { VStack, Input, InputGroup, InputLeftAddon, HStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Controller, useFormContext } from "react-hook-form";
import ListCategories from "../ListCategories";

export default function Header({ data }: any) {
  const route = useRoute();
  const methods = useFormContext();
  const { control } = methods;
  const { name } = route;
  return (
    <VStack>
      <HStack
        backgroundColor="#219653"
        borderBottomRightRadius={30}
        borderBottomLeftRadius={30}
        paddingTop={58}
        paddingX={5}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <InputGroup
          w={{
            base: "55%",
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
                placeholder="Procure aqui"
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

        <Logo />
      </HStack>
      {name != "myCart" && <ListCategories data={data} />}
    </VStack>
  );
}
