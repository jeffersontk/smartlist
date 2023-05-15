import { Modal } from "react-native";
import React from "react";
import { Center, Image } from "native-base";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  img: any;
}
export default function EncarteFullScreen({
  img,
  isOpen,
  onClose,
}: modalProps) {
  return (
    <Modal visible={isOpen} onRequestClose={onClose} transparent={true}>
      <Center w="100%" h="100%">
        <Image source={img} alt="" maxW={400} maxH={700} resizeMode="contain" />
      </Center>
    </Modal>
  );
}
