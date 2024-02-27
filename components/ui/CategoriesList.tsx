import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: HTMLWidget;
  categories?: Array<
    {
      icon: ImageWidget;
      label: string;
      link: string;
      description: string;
      width?: number;
      height?: number;
    }
  >;
}

export default function CategoriesList({ title, categories }: Props) {
  return (
    <div class="flex flex-col lg:flex-row items-center justify-between container max-w-[95%] lg:max-w-[1350px] px-4 gap-6 py-6">
      <div
        class="leading-[18px] lg:text-[26px] lg:leading-[30px] text-nowrap"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <div class="flex flex-wrap w-full items-center justify-center gap-3">
        {categories?.map((
          { icon, label, link, description, width, height },
        ) => (
          <a
            href={link}
            aria-label={description ?? label}
            class="flex flex-col gap-1.5 px-3 items-center justify-center text-center w-[100px] h-[100px] bg-card hover:bg-red/20 cursor-pointer rounded transition-colors duration-200"
          >
            <Image
              src={icon}
              alt={description}
              width={width || 28}
              height={height || 28}
              loading="lazy"
              class="object-cover"
            />
            <span class="text-sm leading-4 text-[#333]">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
