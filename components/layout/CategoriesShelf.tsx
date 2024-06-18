import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";

import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy name
 */
export interface CallToAction {
  link: string;
  /**
   * @default Confira
   */
  name: string;
}

/**
 * @titleBy label
 */
export interface Category {
  image: ImageWidget;
  label: string;
  callToAction: CallToAction;
}

export interface Props {
  title?: HTMLWidget;
  categories?: Category[];
}

function CategoryCard({ image, label, callToAction }: Category) {
  return (
    <div class="flex flex-col items-center justify-between w-full h-[294px]">
      <Image
        src={image}
        width={204}
        height={204}
        loading="lazy"
        fetchPriority="low"
        class="h-[204px] rounded-tl-2xl rounded-br-2xl"
      />

      <span class="font-bold truncate w-full leading-5 text-center">
        {label}
      </span>

      <a
        href={callToAction.link}
        class="flex items-center justify-center text-red font-bold rounded-[2px] border-2 border-red h-10 w-32 hover:text-white-normal hover:bg-red duration-300 transition-colors ease-in-out"
      >
        {callToAction.name}
      </a>
    </div>
  );
}

export default function CategoriesShelf({ title, categories = [] }: Props) {
  return (
    <div class="w-full container py-8 flex flex-col gap-10 lg:py-10 max-w-[95%] xl:max-w-[85%]">
      {title && (
        <div
          class="leading-[18px] lg:text-[26px] lg:leading-[30px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      <div class="grid mx-auto pb-8 xl:pb-0">
        <Slider class="inline-flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end gap-4 scrollbar xl:scrollbar-none pb-8 xl:pb-0">
          {categories?.map((category, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-52"
            >
              <CategoryCard {...category} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
    </div>
  );
}
