import { Button, FormControl, HStack, Input, Modal, Text } from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useCart } from "../../context/cartProvider";

interface modalProps {
  showModal: boolean;
  setShowModal: any;
  id: string;
  title: string;
  inputNamePrice: string;
  inputNameQuantity: string;
}

export default function ModalAddInList({
  showModal,
  setShowModal,
  id,
  title,
  inputNamePrice,
  inputNameQuantity,
}: modalProps) {
  const methods = useFormContext();
  const price = methods.watch(inputNamePrice);
  const quantity = methods.watch(inputNameQuantity);
  const { addItem } = useCart();

  const handleConfirm = (data: any) => {
    const checkedItems = Object.entries(data)
      .filter(([key, value]) => key.startsWith("check") && value)
      .map(([key]) => {
        const item = key.replace("check", "");
        let quantity = 1;

        if (
          data.hasOwnProperty(
            `qnt${item.charAt(0).toUpperCase()}${item.slice(1)}`
          )
        ) {
          const quantityValue =
            data[`qnt${item.charAt(0).toUpperCase()}${item.slice(1)}`];
          quantity = parseFloat(quantityValue) || 0;
        }
        const priceValue =
          data[`price${item.charAt(0).toUpperCase()}${item.slice(1)}`];
        const price = parseFloat(priceValue) || 0;
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
      setShowModal(false);
    }
  };

  return (
    <Modal isOpen={showModal}>
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
              isInvalid={!!methods.formState.errors[inputNamePrice]}
            >
              <FormControl.Label>Preço</FormControl.Label>
              <Controller
                control={methods.control}
                name={inputNamePrice}
                defaultValue={price ?? "0"}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    value={field.value}
                    isInvalid={!!methods.formState.errors[inputNamePrice]}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {methods.formState.errors[inputNamePrice]?.message ||
                  "Campo obrigatório"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl maxW="48%">
              <FormControl.Label>Quantidade</FormControl.Label>
              <Controller
                control={methods.control}
                name={inputNameQuantity}
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
