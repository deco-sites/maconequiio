import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { clx } from "deco-sites/maconequiio/sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{{description}}}
 */
export interface Brands {
  image: ImageWidget;
  link: string;
  description: string;
  width?: number;
  height?: number;
}

export interface Props {
  title: string;
  brands: Brands[];
  layout?: {
    showArrows?: boolean;
    isInfinite?: boolean;
    interval?: number;
  };
}

export default function Brands(
  { title, layout, brands }: Props = { title: "Principais Marcas", brands: [] },
) {
  const id = useId();

  return (
    <div class="flex flex-col gap-2.5 container items-center justify-center w-full p-4">
      {title && (
        <div class="flex flex-col gap-1 pb-1.5 w-full border-b border-b-black">
          <h1 class="text-lg font-bold tracking-tight">{title}</h1>
        </div>
      )}

      <div
        id={id}
        class={clx(
          "grid",
          layout?.showArrows && "grid-cols-[24px_1fr_24px]",
          "container",
        )}
      >
        <Slider class="carousel carousel-center gap-4 row-start-2 row-end-5">
          {brands?.map((brand, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-40 h-full"
            >
              <a href={brand.link} class="border-2 border-gray-300 w-full">
                <Image
                  src={brand.image}
                  width={160 || brand.width}
                  height={36 || brand.height}
                  loading="lazy"
                  decoding="async"
                  class="w-full"
                />
              </a>
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="disabled:opacity-50">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="disabled:opacity-50">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}

        <SliderJS
          rootId={id}
          infinite={layout?.isInfinite}
          interval={layout?.interval && layout.interval * 1e3}
          scroll="smooth"
        />
      </div>
    </div>
  );
}
