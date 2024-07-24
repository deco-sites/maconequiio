import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "$store/sdk/clx.ts";
import type { CallToAction } from "../layout/CategoriesShelf.tsx";
import type { RichText } from "apps/admin/widgets.ts";

export interface Props {
  products: Product[] | null;
  title?: RichText;
  /** @format textarea */
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
  /** @format color-input */
  background?: string;
  callToAction?: CallToAction;
  isInfinite?: boolean;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  background,
  callToAction,
  isInfinite = false,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-[300px]",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div
      style={{ backgroundColor: background }}
      class="flex items-center justify-center w-full h-full py-8 lg:py-10"
    >
      <div class="w-full container max-w-[95%] lg:max-w-[1350px] flex flex-col gap-10">
        <Header
          title={title || ""}
          description={description || ""}
          isHTML
        />

        <div
          id={id}
          class={clx(
            "grid",
            layout?.showArrows && "grid-cols-[48px_1fr_48px]",
            "px-4 container",
          )}
        >
          <Slider class="carousel carousel-center gap-1 lg:gap-4 row-start-2 row-end-5">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                )}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>

          {layout?.showArrows && (
            <>
              <div class="relative block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="absolute w-10 h-10 flex justify-center items-center border border-[#E7E7E7] bg-white-normal rounded-full disabled:opacity-50">
                  <Icon
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="w-5"
                  />
                </Slider.PrevButton>
              </div>
              <div class="relative block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="absolute w-10 h-10 flex justify-center items-center border border-[#E7E7E7] bg-white-normal rounded-full disabled:opacity-50">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
          )}
          <SliderJS rootId={id} infinite={isInfinite} scroll="smooth" />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product, index) =>
                  mapProductToAnalyticsItem({
                    index,
                    product,
                    ...(useOffer(product.offers)),
                  })
                ),
              },
            }}
          />
        </div>

        {callToAction && (
          <div class="flex items-center justify-center w-full mt-5">
            <a
              href={callToAction.link}
              class="flex items-center justify-center text-red font-bold rounded border-2 border-red h-10 hover:text-white-normal hover:bg-red duration-300 transition-colors ease-in-out px-5 py-3"
            >
              {callToAction.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductShelf;
