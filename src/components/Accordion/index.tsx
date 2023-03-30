import { View, Text, TouchableOpacity } from "react-native";
import { Pressable, Flex } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { styles } from "./styles";

interface props {
  children: React.ReactNode;
  title: string;
}

export default function ItemList({ children, title }: props) {
  return (
    <Pressable
      rounded="8"
      overflow="hidden"
      borderWidth="1"
      borderColor="coolGray.300"
      maxW="96"
      bg="coolGray.100"
      p="5"
      mb="5"
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
