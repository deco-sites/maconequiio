import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { relative } from "$store/sdk/url.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  similarsProducts: Product[] | null;
}

export default function SimilarsProducts({ similarsProducts }: Props) {
  if (!similarsProducts || similarsProducts.length === 0) return null;

  const id = useId();

  return (
    <div class="flex items-center justify-center w-full h-full py-8 lg:py-10">
      <div class="flex flex-col gap-8 container">
        <h1 class="text-2xl text-black-neutral">
          Produto <b>Similares</b>
        </h1>

        <div id={id} class="grid">
          <Slider class="carousel carousel-center sm:carousel-end gap-4 xl:gap-10">
            {similarsProducts.map(({ image: images, url, offers }, index) => {
              const [front] = images ?? [];
              const { price } = useOffer(offers);

              return (
                <Slider.Item class="carousel-item w-28 h-28" index={index}>
                  <a
                    href={url && relative(url)}
                    class="flex flex-col items-center justify-center bg-white-ice border border-white-base rounded w-full h-full p-0.5"
                  >
                    <Image
                      src={front.url!}
                      alt={front.alternateName}
                      width={93}
                      height={93}
                      class="col-span-full row-span-full rounded w-full"
                      loading="lazy"
                      decoding="async"
                    />

                    <span class="flex items-center justify-center text-black-neutral text-sm font-bold leading-4">
                      {formatPrice(price, offers?.priceCurrency)}
                    </span>
                  </a>
                </Slider.Item>
              );
            })}
          </Slider>

          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}
