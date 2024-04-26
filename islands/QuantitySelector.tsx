import Component from "$store/components/ui/QuantitySelector.tsx";
import type { Props } from "$store/components/ui/QuantitySelector.tsx";

import { useUI } from "$store/sdk/useUI.ts";

function Island({ disabled, loading, variation }: Props) {
  const { productQuantity } = useUI();

  const onChange = (newValue: number) => {
    productQuantity.value = newValue;
  };

  return (
    <Component
      quantity={productQuantity.value}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
      variation={variation}
    />
  );
}

export default Island;
