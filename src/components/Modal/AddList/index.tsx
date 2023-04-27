import { Button, FormControl, HStack, Input, Modal, Text } from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useCart } from "../../../context/cartProvider";

interface modalProps {
  isOpen: boolean;
  onClose: any;
  id: string;
  title: string;
}

export default function ModalAddInList({
  isOpen,
  onClose,
  id,
  title,
}: modalProps) {
  const methods = useFormContext();
  const price = methods.watch(`${id}price`);
  const quantity = methods.watch(`${id}quantity`);
  const { addItem } = useCart();

  const handleConfirm = (data: any) => {
    const checkedItems = Object.entries(data)
      .filter(([key, value]) => key.startsWith(id) && value)
      .map(() => {
        return {
          id,
          name: title,
          quantity,
          price,
        };
      });
    if (checkedItems.length > 0) {
      addItem(checkedItems);
    }
    if (price !== 0 && price !== undefined && !isNaN(price)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Content maxWidth="400px">
        <Modal.Header bg="green.700">
          <Text color="white" fontFamily="heading" fontSize="lg">
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <HStack flexDirection="row" space={2}>
            <FormControl
              isRequired
              maxW="48%"
              isInvalid={!!methods.formState.errors[`${id}price`]}
            >
              <FormControl.Label>Preço</FormControl.Label>
              <Controller
                control={methods.control}
                name={`${id}price`}
                defaultValue={price ?? "0"}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    value={field.value}
                    isInvalid={!!methods.formState.errors[`${id}price`]}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {methods.formState.errors[`${id}price`]?.message ||
                  "Campo obrigatório"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl maxW="48%">
              <FormControl.Label>Quantidade</FormControl.Label>
              <Controller
                control={methods.control}
                name={`${id}quantity`}
                defaultValue={quantity ?? "1"}
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>
          </HStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              w="100%"
              bg="green.700"
              onPress={methods.handleSubmit(handleConfirm)}
              aria-label="Confirmar"
              isDisabled={!methods.formState.isValid}
            >
              Confirmar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
