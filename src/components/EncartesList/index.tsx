import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlatList, Image, useDisclose } from "native-base";
import { encartesList } from "../../data/encartes";
import EncarteFullScreen from "../Modal/EncarteFullScreen";

export default function EncartList() {
  const [img, setImg] = useState();
  const { isOpen, onClose, onOpen } = useDisclose();
  const handleOpenImage = (image: any) => {
    setImg(image);
    onOpen();
  };
  return (
    <>
      <FlatList
        data={encartesList}
        horizontal
        px={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenImage(item.img)}>
            <Image
              source={item.img}
              alt=""
              maxH={530}
              w="320"
              resizeMode="contain"
              mr="3"
            />
          </TouchableOpacity>
        )}
      />
      <EncarteFullScreen onClose={onClose} isOpen={isOpen} img={img} />
    </>
  );
}
{
  /* <ScrollView horizontal px="5" showsHorizontalScrollIndicator={false}>
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
</ScrollView> */
}
