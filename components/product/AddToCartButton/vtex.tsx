import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

import { useUI } from "$store/sdk/useUI.ts";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity?: number;
}

function AddToCartButton(
  { seller, productID, eventParams, isUnavailable, type, quantity }: Props,
) {
  const { productQuantity } = useUI();
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: productQuantity.value,
      }],
    });

  if (type === "Variants") {
    const onVariantAddItem = () =>
      addItems({
        orderItems: [{
          id: productID,
          seller: seller,
          quantity: quantity ?? 1,
        }],
      });

    return (
      <Button
        onAddItem={onVariantAddItem}
        eventParams={eventParams}
        isUnavailable={isUnavailable}
        type={type}
      />
    );
  }

  return (
    <Button
      onAddItem={onAddItem}
      eventParams={eventParams}
      isUnavailable={isUnavailable}
      type={type}
    />
  );
}

export default AddToCartButton;
