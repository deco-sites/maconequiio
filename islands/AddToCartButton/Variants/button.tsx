import QuantitySelector from "$store/islands/QuantitySelector.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import { useState } from "preact/compat";
import type { Props as BtnProps } from "$store/components/product/AddToCartButton/common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

export default function AddToCart({ eventParams, productID, seller }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div class="flex items-center justify-between md:justify-center gap-12 w-full">
      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
        variation="variation-3"
      />

      <AddToCartButtonVTEX
        eventParams={eventParams}
        productID={productID}
        seller={seller}
        quantity={quantity}
        type="Variants"
      />
    </div>
  );
}
