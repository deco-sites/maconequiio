import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Banner {
  source: ImageWidget;
  description: string;
  link: string;
  width?: number;
  height?: number;
}

export interface Props {
  title: RichText;
  /** @format color-input */
  backgroundColor?: string;
  /**
   * @minItems 04
   * @maxItems 04
   */
  banners: Banner[];
}

export default function MosaicBanners(
  { title, backgroundColor, banners = [] }: Props,
) {
  const [first, second, ...images] = banners;

  return (
    <div
      style={{ backgroundColor }}
      class="flex items-center justify-center w-full h-full"
    >
      <div class="w-full container py-8 flex flex-col gap-10 lg:py-10 max-w-[95%] lg:max-w-[1350px]">
        <div
          class="leading-[18px] lg:text-[26px] lg:leading-[30px]"
          dangerouslySetInnerHTML={{ __html: title || "" }}
        />

        <div class="flex flex-col md:flex-row items-center justify-center w-full h-full gap-2.5">
          <a href={first.link} class="w-full h-full">
            <Image
              src={first.source}
              width={first.width || 645}
              height={first.height || 385}
              alt={first.description}
              loading="lazy"
              class="w-full"
            />
          </a>

          <div class="flex flex-col gap-2.5 w-full">
            <a href={second.link} class="w-full h-full">
              <Image
                src={second.source}
                width={second.width || 645}
                height={second.height || 188}
                alt={second.description}
                loading="lazy"
                class="w-full"
              />
            </a>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              {images.map((image) => (
                <a href={image.link} class="w-full h-full">
                  <Image
                    src={image.source}
                    width={image.width || 318}
                    height={image.height || 188}
                    alt={image.description}
                    loading="lazy"
                    class="w-full"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
