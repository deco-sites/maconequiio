import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";

export interface Subcategory {
  image: {
    source: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  };
  label: string;
  link: string;
}

export interface Props {
  subcategories?: Subcategory[];
}

function Subcategory({ label, image, link }: Subcategory) {
  return (
    <a
      href={link}
      class="flex flex-col h-full items-center justify-center gap-1 w-full max-h-[137px]"
    >
      <div class="flex items-center justify-center p-1 w-full h-full border border-white-base bg-white-normal rounded shadow">
        <Image
          src={image.source}
          alt={image.description}
          width={52 || image.width}
          height={52 || image.height}
        />
      </div>
      <span class="text-xs text-center text-black-neutral font-medium h-7">
        {label}
      </span>
    </a>
  );
}

export default function SearchSubcategories({ subcategories = [] }: Props) {
  if (!subcategories || subcategories.length === 0) return null;

  const id = useId();

  return (
    <div
      id={id}
      class="grid items-center w-full h-[160px] bg-gray-light-shade px-3 md:px-8 py-2.5"
    >
      <Slider class="carousel xl:justify-between col-span-full col-start-1 row-start-1 row-span-full h-full w-full gap-3">
        {subcategories.map((subcategory, index) => (
          <Slider.Item index={index} class="carousel-item w-28 h-[137px]">
            <Subcategory {...subcategory} />
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} scroll="smooth" />
    </div>
  );
}
