import { SendEventOnView } from "$store/components/Analytics.tsx";
import QuantitySelector from "$store/islands/QuantitySelector.tsx";
import Rating from "$store/components/daisy/Rating.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const discount = Math.round(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col xl:max-w-xl px-4 xl:px-0" id={id}>
      {/* <Breadcrumb itemListElement={breadcrumb.itemListElement} /> */}
      {/* Code and name */}
      <div class="flex flex-col w-full h-full mt-4 sm:mt-8 gap-2">
        <h1>
          <span class="font-medium text-2xl capitalize text-black-neutral">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>

        <div class="flex items-center justify-between xl:max-w-[95%] gap-1">
          <div class="flex items-center gap-2 sm:gap-3.5">
            {gtin && (
              <span class="text-xs leading-4 font-normal text-[#555]">
                {gtin}
              </span>
            )}
            {product.brand && (
              <a href="#" class="underline text-[#AD212B] text-sm">
                {product.brand?.name}
              </a>
            )}
          </div>

          <div class="flex items-center gap-0.5 text-yellow-400">
            <Rating maxRating={5} rating={5} />
            <span>(233)</span>
          </div>
        </div>
      </div>

      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <a href="#descricao" class="text-sm underline text-red-light">
          Ver descrição completa
        </a>
      </div>

      {/* Sku Selector */}
      <ProductSelector product={product} />

      {/* Prices */}
      <div class="flex flex-row items-center justify-between mt-4 w-full gap-x-2 xl:max-w-sm">
        <div class="flex items-center gap-2">
          <div class="flex flex-col gap-0.5">
            {(listPrice ?? 0) > price && (
              <span class="line-through text-sm text-gray-base">
                de: {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}

            <span class="font-medium text-lg text-black-neutral">
              {formatPrice(price, offers?.priceCurrency)}
            </span>

            {installments && (
              <span class="text-xs sm:text-sm text-gray-base">
                ou {installments?.replace(".", ",")}
              </span>
            )}
          </div>

          {discount > 0 && (
            <div class="flex items-center justify-center text-xs leading-3 font-bold bg-red-light text-white-normal w-10 h-8 p-0.5 rounded-tl-2xl rounded-br-2xl">
              -{discount}%
            </div>
          )}
        </div>

        <div class="hidden lg:flex bg-gray-300 h-14 w-0.5" />

        <QuantitySelector
          quantity={1}
          onChange={() => {}}
          variation="variation-2"
        />
      </div>

      {/* Add to Cart and Favorites button */}
      <div class="mt-5 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  {
                    /* <WishlistButtonVtex
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  /> */
                  }
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Security */}
      <div class="flex flex-col gap-5 mt-5 text-sm">
        <div class="flex flex-col gap-1">
          <div class="flex gap-0.5">
            <Icon id="Truck" size={20} class="text-green" />
            <span class="text-green font-medium">Entrega expressa</span>
          </div>
          <p>
            Você pode retirar mais rápido nas{" "}
            <span class="underline text-red cursor-pointer">
              seguintes lojas
            </span>
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <Icon id="Guard" width={14} height={16} class="text-green" />
            <p>
              <b>Compra 100% segura</b> - PCI Certified Vtex
            </p>
          </div>

          <div class="flex items-center gap-2">
            <Icon id="Check" width={15} height={10} />
            <p>
              <b>Loja Confiável</b> nota dos clientes 4,5/5
            </p>
          </div>

          <div class="flex items-center gap-2">
            <Icon id="Check" width={15} height={10} />
            <p>
              <b>Devolução gratuita</b>{" "}
              sem complicações em até 7 dias após o recebimento
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
