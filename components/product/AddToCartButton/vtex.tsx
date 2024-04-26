import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

import { useUI } from "$store/sdk/useUI.ts";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
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

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
