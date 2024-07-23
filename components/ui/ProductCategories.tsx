import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Props {
  title: RichText;
  /** @format color-input */
  backgroundColor?: string;
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

export default function ProductCategories(
  { title, categories, backgroundColor }: Props,
) {
  return (
    <div
      style={{ backgroundColor }}
      class="flex items-center justify-center w-full h-full"
    >
      <div class="flex flex-col lg:flex-row lg:items-center justify-between container max-w-[95%] lg:max-w-[1350px] px-4 gap-6 py-6">
        <div
          class="leading-[18px] lg:text-[26px] lg:leading-[30px] lg:max-w-64"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div class="flex flex-row w-full items-center lg:justify-center gap-6 overflow-x-auto lg:overflow-hidden scrollbar pb-4">
          {categories?.map((
            { icon, label, link, description, width, height },
          ) => (
            <a
              href={link}
              aria-label={description ?? label}
              class="flex flex-col gap-3 items-center justify-center text-center w-[139px] h-full max-h-[168px] cursor-pointer"
            >
              <Image
                src={icon}
                alt={description}
                width={width || 139}
                height={height || 139}
                loading="lazy"
                class="object-cover rounded-full"
              />

              <span class="text-sm leading-4 text-black-neutral truncate font-bold">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
