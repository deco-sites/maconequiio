import { useMemo } from "preact/hooks";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import Card from "./Card.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/BuyTogether/vtex.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/maconequiio/sdk/format.ts";

import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
}

export default function BuyTogether({ products }: Props) {
  if (!products || products.length === 0) return null;

  const othersProducts = useMemo(
    () => products.filter((_, index) => index !== 0),
    [products],
  );

  if (!othersProducts || othersProducts.length === 0) return null;

  const productsOffers = useMemo(
    () => products.map((item) => item.offers?.lowPrice ?? 0),
    [products],
  );
  const totalPrice = useMemo(
    () => productsOffers.reduce((acc, price) => acc + price, 0),
    [productsOffers],
  );

  const cartProducts = useMemo(() =>
    products.map((product) => {
      const { seller = "1" } = useOffer(product.offers);
      return {
        id: product.productID,
        seller,
        quantity: 1,
      };
    }), [products]);

  const eventParams = useMemo(() =>
    products.map((item) => ({
      item_id: item.productID,
      item_name: item.isVariantOf?.name || item.name,
      quantity: 1,
    })), [products]);

  return (
    <div class="flex items-center justify-center my-12 py-6 px-4 xl:px-0 bg-white-ice">
      <div class="flex items-center gap-7 xl:max-w-full xl:mx-auto">
        <div class="flex flex-col gap-2.5">
          <h2 class="text-black-neutral font-bold text-xl leading-6">
            Você está vendo
          </h2>
          <Card product={products[0]} />
        </div>
        <Icon
          id="PlusNew"
          width={24}
          height={23}
          strokeWidth={2}
          class="text-green"
        />
        <div class="flex flex-col gap-2.5">
          <h2 class="text-black-neutral font-bold text-xl leading-6">
            Compre junto
          </h2>
          <div class="flex items-center justify-between gap-7">
            {othersProducts.map((product, index) => (
              <>
                <Card product={product} hasViewProductLink={true} />
                {index !== othersProducts.length - 1 && (
                  <Icon
                    id="PlusNew"
                    width={24}
                    height={23}
                    strokeWidth={2}
                    class="text-green"
                  />
                )}
              </>
            ))}
            <Icon
              id="Equals"
              width={20}
              height={17}
              strokeWidth={2}
              class="text-green"
            />
          </div>
        </div>
        <div class="flex flex-col gap-4 items-center justify-center text-center">
          <div class="flex flex-col gap-0">
            <h2 class="text-lg text-black-neutral">Compre estes produtos</h2>
            <span class="text-lg text-black-neutral font-bold">
              por {formatPrice(totalPrice)}
            </span>
          </div>
          <AddToCartButtonVTEX
            products={cartProducts}
            eventParams={{ items: eventParams }}
          />
        </div>
      </div>
    </div>
  );
}
