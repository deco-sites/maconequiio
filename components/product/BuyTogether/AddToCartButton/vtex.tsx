import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  products: Array<{ seller: string; id: string; quantity: number }>;
}

function AddToCartButton({ products, eventParams }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: products,
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
