import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { formatInstallments, formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";
import { useDevice } from "deco/hooks/useDevice.ts";
import AddToCartButtonVTEX from "deco-sites/maconequiio/islands/AddToCartButton/vtex.tsx";

export interface Layout {
  onMouseOver?: {
    showCardShadow?: boolean;
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    flag?: boolean;
    installments?: boolean;
    cta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const WIDTH = 292;
const HEIGHT = 220;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  index,
}: Props) {
  const {
    url,
    productID,
    name: partialName,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const description = product.description || isVariantOf?.description;
  const [front] = images ?? [];
  const { listPrice, price, installments, availability, seller = "1" } =
    useOffer(offers);
  const name = product?.isVariantOf?.name || partialName;

  const l = layout;

  const device = useDevice();
  const isDesktop = device === "desktop";

  const isUnavailable = availability === "https://schema.org/OutOfStock";

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
    index,
  });

  const discount = Math.round(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  return (
    <div
      id={id}
      class={`card group w-full xl:h-[380px] duration-300 transition-all ease-out bg-white-normal text-start ${
        !l?.hide?.cta ? "" : "shadow-none"
      } ${l?.onMouseOver?.showCardShadow ? "xl:hover:shadow-md" : ""}`}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <div
          class={`absolute top-2 z-10 flex items-center left-1/2`}
        >
          {/* <div class=""></div> */}
        </div>

        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 items-center w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="col-span-full row-span-full rounded w-full h-3/4 object-contain"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-4 gap-3 lg:gap-2">
        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <a
              href={url && relative(url)}
              aria-label="view product"
              class="flex flex-col gap-0 pt-3 border-t border-t-white-base"
            >
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h2
                    class="line-clamp-2 text-sm text-black-neutral uppercase font-medium leading-4"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
              {l?.hide?.productDescription
                ? (
                  ""
                )
                : (
                  <div
                    class="truncate text-sm lg:text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                  />
                )}
            </a>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex w-full items-center justify-between gap-2 h-8">
              {!isUnavailable && (
                <div class="flex flex-col gap-0.5">
                  {(listPrice ?? 0) > (price ?? 0) && (
                    <div class="line-through text-gray-base text-xs leading-3">
                      de: {formatPrice(listPrice, offers?.priceCurrency)}
                    </div>
                  )}

                  <div class="text-black-neutral text-sm font-bold leading-4">
                    por: {formatPrice(price, offers?.priceCurrency)}
                  </div>

                  {!l?.hide?.installments && (
                    <div class="text-xs leading-3 text-gray-base">
                      {formatInstallments(installments)}
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
          )}

        {!l?.hide?.cta && isDesktop
          ? (
            <div
              class={`opacity-0 group-hover:opacity-100 items-end flex-auto transition-all duration-150 ease-linear`}
            >
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={seller}
                isUnavailable={isUnavailable}
                type="Shelf"
              />
            </div>
          )
          : (
            ""
          )}
      </div>
    </div>
  );
}

export default ProductCard;
