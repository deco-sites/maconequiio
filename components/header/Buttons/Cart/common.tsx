import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { formatPrice } from "deco-sites/maconequiio/sdk/format.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  type?: "icon" | "completed";
}

function CartButton(
  { loading, currency, total, items, type = "completed" }: Props,
) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  if (type === "icon") {
    return (
      <div class="indicator">
        <span
          class={`indicator-item badge badge-secondary bg-black text-white-normal badge-sm ${
            totalItems === 0 ? "hidden" : ""
          }`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>

        <Button
          class="btn-circle btn-sm btn-ghost"
          aria-label="open cart"
          data-deco={displayCart.value && "open-cart"}
          loading={loading}
          onClick={onClick}
        >
          <Icon id="CartIcon" size={24} strokeWidth={2} class="text-red" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      data-deco={displayCart.value && "open-cart"}
      loading={loading}
      aria-label="open cart"
      onClick={onClick}
      class="flex items-center justify-center gap-2.5 w-full max-w-40 h-14 text-white-normal bg-red hover:bg-red rounded-tl-2xl rounded-br-2xl px-4 shadow-lg"
    >
      <div class="indicator">
        <span
          class={`indicator-item badge border-none w-5 h-5 bg-black text-white-normal badge-sm -translate-x-[-13.75px] translate-y-[-6px] ${
            totalItems === 0 ? "hidden" : ""
          }`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>

        <Icon
          id="CartIcon"
          size={22}
          strokeWidth={2}
          class="text-white-normal"
        />
      </div>

      <div class="flex flex-col gap-0.5">
        <span>Cesta</span>
        <span class="font-bold text-sm">{formatPrice(total)}</span>
      </div>
    </Button>
  );
}

export default CartButton;
