import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  isUnavailable?: boolean;
  type?: "PDP" | "Shelf" | "Variants";
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart({
    eventParams: props.eventParams,
    onAddItem: props.onAddItem,
  });

  if (props.type === "Shelf") {
    return (
      <Button
        {...btnProps}
        disabled={props.isUnavailable}
        aria-label="buy product"
        class="btn btn-block rounded bg-green hover:bg-green/90 border border-green drop-shadow transition-all duration-150 text-white-normal font-bold text-sm leading-5 disabled:bg-black-neutral disabled:hover:bg-black-neutral/90 disabled:text-white-normal"
      >
        {props.isUnavailable ? "Indisponível" : "Comprar"}
      </Button>
    );
  }

  return (
    <Button
      {...btnProps}
      disabled={props.isUnavailable}
      class="max-w-sm h-[60px] rounded bg-green hover:bg-green/90 border border-green drop-shadow transition-all duration-150 text-white-normal font-bold text-lg leading-5 disabled:bg-black-neutral disabled:hover:bg-black-neutral/90 disabled:text-white-normal"
    >
      {props.isUnavailable ? "Indisponível" : "Comprar"}
    </Button>
  );
}
