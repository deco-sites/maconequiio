import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

import { useId } from "$store/sdk/useId.ts";
import { clx } from "$store/sdk/clx.ts";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface BannerProps {
  image: ImageWidget;
  alt: string;
  title: string;
  subtitle: HTMLWidget;
  link: string;
  target: "_blank" | "_self";
  loading?: "lazy" | "eager";
}

export interface Props {
  title: HTMLWidget;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
    interval?: number;
  };
  banners?: BannerProps[];
}

function Banner(
  { image, alt, title, subtitle, link, target, loading }: BannerProps,
) {
  return (
    <a
      class="flex flex-col items-center justify-center text-center gap-4 w-[292px] h-[375px]"
      href={link || "#"}
      aria-label={alt}
      target={target || "_self"}
    >
      <Image
        src={image}
        width={292}
        height={292}
        alt={alt}
        loading={loading || "lazy"}
        class="rounded border border-[#ccc]"
      />
      <div class="flex flex-col gap-2">
        <h2 class="font-bold leading-5 text-nowrap">{title}</h2>

        <div
          class="text-sm leading-4"
          dangerouslySetInnerHTML={{ __html: subtitle || "" }}
        />
      </div>
    </a>
  );
}

export default function CarouselBannerWithTitle(
  { title, layout, banners }: Props,
) {
  const id = useId();

  if (!banners || banners.length === 0) {
    return null;
  }

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-[21.25%] xl:w-[292px]",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-[80%]",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div class="flex flex-col gap-6 container max-w-[95%] xl:max-w-[85%] py-6">
      <div
        class="leading-[18px] lg:text-[26px] lg:leading-[30px]"
        dangerouslySetInnerHTML={{ __html: title || "" }}
      />

      <div
        class={clx(
          "grid",
          layout?.showArrows && "grid-cols-[48px_1fr_48px]",
          "mx-auto pb-8 lg:pb-0",
        )}
      >
        <Slider class="inline-flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end gap-4 sm:gap-10 row-start-2 row-end-5 scrollbar lg:scrollbar-none pb-8 lg:pb-0">
          {banners?.map((banner, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 4],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <Banner {...banner} />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="w-5 rotate-180"
                />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}

        <SliderJS
          rootId={id}
          scroll="smooth"
          interval={layout?.interval && layout.interval * 1e3}
        />
      </div>
    </div>
  );
}
