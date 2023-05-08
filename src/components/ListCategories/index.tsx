import React from "react";
import { Box, Center, FlatList, HStack, Text, View } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListCategoriesProps {
  data: Object[];
}

export default function ListCategories({ data }: ListCategoriesProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const { navigate } = navigation;

  const handleNavigate = (route: any) => {
    navigate(route.name, route.category);
  };

  return (
    <HStack padding={5}>
      <View mr="3">
        <TouchableOpacity onPress={() => handleNavigate({ name: "home" })}>
          <Center bg="#219653" p="4" rounded="md">
            <Text color="white">Encartes</Text>
          </Center>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }: any) => {
          return (
            <View mr="3">
              <TouchableOpacity onPress={() => handleNavigate(item)}>
                <Center
                  borderBottomWidth={4}
                  borderBottomColor={
                    item.name === route.name ? "#219653" : "gray.400"
                  }
                  p="3"
                >
                  <Text
                    color={item.name === route.name ? "#219653" : "gray.400"}
                  >
                    {item.name}
                  </Text>
                </Center>
              </TouchableOpacity>
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </HStack>
  );
}
