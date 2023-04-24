import React from "react";
import Logo from "../../assets/logo.svg";
import {
  VStack,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Text,
  Center,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";

export default function Header({ navigation, title }: any) {
  return (
    <VStack>
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
          <IconEntypo
            name="menu"
            size={34}
            color="#f9f9f9"
            onPress={() => navigation.toggleDrawer()}
          />
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
          <Input
            w={{
              base: "100%",
            }}
            mt="2"
            fontSize="md"
            color="green.500"
            variant="rounded"
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
        </InputGroup>
      </VStack>
      <Center my="4">
        <Text fontSize="xl" color="gray.700">
          {title}
        </Text>
      </Center>
    </VStack>
  );
}
