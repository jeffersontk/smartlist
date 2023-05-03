import { Button, FormControl, Input, Modal, Text } from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function ModalIHaveAtHome({
  id,
  isOpen,
  onClose,
  action1,
  action2,
}: any) {
  const methods = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="420px">
        <Modal.Header bg="green.700">
          <Text color="white" fontFamily="heading" fontSize="lg">
            Já tem em casa
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text fontSize="md" mb="2">
            Esse produto você precisa comprar?
          </Text>
          <FormControl>
            <FormControl.Label>Quantas unidades você tem?</FormControl.Label>
            <Controller
              control={methods.control}
              name={`${id}currentQuantity`}
              defaultValue={"0"}
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              w="50%"
              bg="gray.500"
              aria-label="preciso comprar"
              onPress={action1}
            >
              Não
            </Button>
            <Button
              w="50%"
              bg="green.700"
              aria-label="Não preciso"
              onPress={action2}
            >
              Sim
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
