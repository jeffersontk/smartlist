import { View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import Header from "../../components/Header";
import { categories } from "../../data/categories";

import encarte1 from "../../assets/encarte1.jpeg";
import encarte2 from "../../assets/encarte2.jpeg";

export default function Home() {
  const methods = useForm();
  return (
    <View>
      <FormProvider {...methods}>
        <Header data={categories} />
      </FormProvider>

      <ScrollView horizontal px="5" showsHorizontalScrollIndicator={false}>
        <Image
          source={encarte1}
          alt=""
          maxH={530}
          w="320"
          resizeMode="contain"
          mr="3"
        />
        <Image
          source={encarte2}
          alt=""
          maxH={530}
          w="320"
          resizeMode="contain"
          mr="3"
        />
      </ScrollView>
    </View>
  );
}
