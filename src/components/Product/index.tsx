import { useDisclose } from "native-base";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { useCart } from "../../context/cartProvider";

import ModalAddInList from "../Modal/AddList";
import ModalIHaveAtHome from "../Modal/IHaveAtHome";
import { ItemCheck } from "../ItemCheck";

interface props {
  id: string;
  title: string;
}

export function Product({ id, title }: props) {
  const methods = useFormContext();
  const { removeItem } = useCart();
  const {
    isOpen: isOpenAddList,
    onClose: onCloseAddList,
    onOpen: onOpenAddList,
  } = useDisclose();
  const {
    isOpen: isOpenIHaveAtHome,
    onClose: onCloseIHaveAtHome,
    onOpen: onOpenIHaveAtHome,
  } = useDisclose();
  const [disableItem, setDisableItem] = useState(false);
  const swipeableRef = useRef<any>(null);

  const price = methods.watch(`${id}price`);
  const quantity = methods.watch(`${id}quantity`);
  const [showQuantityAndPrice, setShowQuantityAndPrice] = useState(false);
  const [showCurrentQuantity, setShowCurrentQuantity] = useState(false);

  const currentQuantity = methods.watch(`${id}currentQuantity`);

  const handleINeedToBuy = useCallback(() => {
    setShowCurrentQuantity(true);
    onCloseIHaveAtHome();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, []);

  const handleIDontNeedToBuy = useCallback(() => {
    setDisableItem(!disableItem);
    if (price && +price <= 0) {
      methods.setValue(`${id}price`, 0);
    }
    if (currentQuantity && +currentQuantity <= 0) {
      setShowCurrentQuantity(true);
    }
    removeItem(id);
    onCloseIHaveAtHome();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, []);

  const handleEnable = useCallback(() => {
    setDisableItem(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, []);

  const handleRemoveItem = useCallback(() => {
    removeItem(id);
    methods.setValue(`${id}price`, "0");
    setShowQuantityAndPrice(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, []);

  useEffect(() => {
    if (price != null && +price > 0) {
      setShowQuantityAndPrice(true);
    }
  }, [price]);

  return (
    <>
      <ItemCheck
        handleEnable={handleEnable}
        handleOpenAddToList={onOpenAddList}
        handleOpenIHaveAtHome={onOpenIHaveAtHome}
        handleRemoveItem={handleRemoveItem}
        title={title}
        currentQuantity={currentQuantity}
        price={+price}
        quantity={+quantity}
        swipeableRef={swipeableRef}
        isDisabled={disableItem}
        showCurrentQuantity={showCurrentQuantity}
        showQuantityAndPrice={showQuantityAndPrice}
      />

      <ModalAddInList
        id={id}
        onClose={onCloseAddList}
        isOpen={isOpenAddList}
        title={title}
      />
      <ModalIHaveAtHome
        id={id}
        isOpen={isOpenIHaveAtHome}
        onClose={onCloseIHaveAtHome}
        action1={handleIDontNeedToBuy}
        action2={handleINeedToBuy}
      />
    </>
  );
}

/* export const Product = memo(ProductComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
}); */
