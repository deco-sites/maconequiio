import Button from "../ui/Button.tsx";

export interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  variation?: "variation-1" | "variation-2" | "variation-3";
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, variation = "variation-1" }: Props,
) {
  const decrement = () => onChange?.(Math.max(1, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  if (variation === "variation-2") {
    return (
      <div class="flex flex-col">
        <span class="text-gray-base text-sm">Quantidade:</span>

        <div class="flex flex-row items-center sm:max-w-[109px] w-full justify-between h-[38px]">
          <Button
            class="flex items-center justify-center text-xl bg-white-base text-black font-bold rounded-l-md h-full px-4"
            hasBtnClass={false}
            onClick={increment}
            disabled={disabled}
            loading={loading}
          >
            +
          </Button>

          <input
            class="bg-white-normal flex-shrink p-4 h-full text-sm text-center [appearance:textfield]"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            max={QUANTITY_MAX_VALUE}
            min={1}
            value={quantity}
            disabled={disabled}
            onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
            maxLength={3}
            size={3}
          />

          <Button
            class="flex items-center justify-center text-xl bg-white-base text-black font-bold rounded-r-md h-full px-4"
            hasBtnClass={false}
            onClick={decrement}
            disabled={disabled}
            loading={loading}
          >
            -
          </Button>
        </div>
      </div>
    );
  }

  if (variation === "variation-3") {
    return (
      <div class="flex flex-col">
        <span class="text-gray-base text-sm">Quantidade:</span>

        <div class="flex flex-row items-center sm:max-w-[109px] w-full justify-between h-[38px]">
          <Button
            class="flex items-center justify-center text-xl bg-white-base text-black font-bold rounded-l-md h-full px-4"
            hasBtnClass={false}
            onClick={decrement}
            disabled={disabled}
            loading={loading}
          >
            -
          </Button>

          <input
            class="bg-white-normal h-full text-sm text-center [appearance:textfield]"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            max={QUANTITY_MAX_VALUE}
            min={1}
            value={quantity}
            disabled={disabled}
            onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
            maxLength={3}
            size={3}
          />

          <Button
            class="flex items-center justify-center text-xl bg-white-base text-black font-bold rounded-r-md h-full px-4"
            hasBtnClass={false}
            onClick={increment}
            disabled={disabled}
            loading={loading}
          >
            +
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div class="join border rounded-none w-min h-9">
      <Button
        hasBtnClass={false}
        class="btn-ghost join-item h-9 w-8"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class="text-center join-item [appearance:textfield] max-h-9"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        hasBtnClass={false}
        class="btn-ghost join-item h-9 w-8"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
