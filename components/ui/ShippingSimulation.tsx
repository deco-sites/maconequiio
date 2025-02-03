import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <div class="flex flex-col gap-2.5 w-full text-black-neutral text-sm font-medium">
      <ul class="flex items-center justify-between bg-[#CCC] px-4 py-0.5 gap-2">
        <li>Valor</li>
        <li class="w-2/3">Disponibilidade</li>
      </ul>

      <ul class="flex flex-col gap-2 px-3">
        {methods.map((method) => (
          <li class="flex justify-between gap-2 items-center pb-1 border-b border-b-[#E3E3E3] last:border-none text-gray-base">
            <span>
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price / 100, currencyCode, locale)
              )}
            </span>

            <span class="w-2/3">
              Em até {formatShippingEstimate(method.shippingEstimate)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-5 border border-[#C4C4C4] p-4 w-full h-full bg-white-ice rounded-md">
      <div class="flex flex-row items-center justify-between w-full">
        <div class="flex gap-2 text-sm text-black-neutral font-medium">
          <Icon id="Truck" size={22} class="text-black-neutral" />
          <span>Calcule seu frete:</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
          }}
          class="flex items-center justify-between gap-4 rounded-md w-2/3 h-11 bg-white-normal border border-[#C4C4C4] px-2.5 text-sm"
        >
          <input
            as="input"
            type="text"
            class="w-4/5 text-black placeholder:text-[#BEBEBE] bg-white-normal focus:outline-none truncate"
            placeholder="Digite seu CEP"
            value={postalCode.value}
            maxLength={8}
            size={8}
            onChange={(e: { currentTarget: { value: string } }) => {
              postalCode.value = e.currentTarget.value;
            }}
          />

          <Button
            hasBtnClass={false}
            type="submit"
            loading={loading.value}
            class="text-green font-medium"
          >
            Calcular
          </Button>
        </form>
      </div>

      <ShippingContent simulation={simulateResult} />
    </div>
  );
}

export default ShippingSimulation;
