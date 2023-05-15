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
import EncartList from "../../components/EncartesList";

export default function Home() {
  const methods = useForm();
  return (
    <View>
      <FormProvider {...methods}>
        <Header data={categories} />
      </FormProvider>
      <EncartList />
    </View>
  );
}
