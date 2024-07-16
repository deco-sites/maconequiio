import { ProductLeaf } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/maconequiio/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/maconequiio/sdk/format.ts";
import AddToCartButton from "$store/islands/AddToCartButton/Variants/button.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  variants: ProductLeaf[];
}

function Variant({ variant }: { variant: ProductLeaf }) {
  const { name, sku, offers } = variant;

  const { listPrice, price, installments, availability, seller = "1" } =
    useOffer(offers);

  const isUnavailable = availability === "https://schema.org/OutOfStock";

  const discount = Math.round(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const eventItem = mapProductToAnalyticsItem({
    product: {
      ...variant,
    },
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col w-full gap-0.5">
      <h1 class="font-bold text-lg capitalize text-black-neutral">
        {name}
      </h1>

      <div class="flex flex-col md:flex-row gap-2 justify-between items-center w-full">
        <div class="flex w-full items-center justify-between gap-2">
          {!isUnavailable && (
            <div class="flex flex-col gap-1.5">
              {(listPrice ?? 0) > (price ?? 0) && (
                <div class="line-through text-gray-base text-sm leading-3">
                  de: {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
              )}

              <div class="text-black-neutral text-lg font-bold leading-4">
                por: {formatPrice(price, offers?.priceCurrency)}
              </div>

              {installments && (
                <div class="text-sm leading-3 text-gray-base mt-0.5">
                  {installments}
                </div>
              )}
            </div>
          )}

          {discount > 0 && (
            <div class="flex items-center justify-center text-xs leading-3 font-bold bg-red-light text-white-normal w-10 h-8 p-0.5 rounded-tl-2xl rounded-br-2xl">
              -{discount}%
            </div>
          )}
        </div>

        <AddToCartButton
          eventParams={{ items: [eventItem] }}
          productID={sku}
          seller={seller}
          isUnavailable={isUnavailable}
        />
      </div>
    </div>
  );
}

export default function Variants({ variants = [] }: Props) {
  return (
    <div class="flex flex-col w-full gap-6 pb-4 mt-5 border-b-2 border-b-red">
      {variants.map((variant) => <Variant variant={variant} />)}
    </div>
  );
}
