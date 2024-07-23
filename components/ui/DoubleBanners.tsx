import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**
 * @altBy title
 */
export interface Banner {
  image: ImageWidget;
  alt: string;
  title: string;
  description: RichText;
  /**
   * @default #
   */
  link: string;
  target?: "_blank" | "_self";
}

export interface Props {
  title?: RichText;
  /**
   * @minItems 2
   * @maxItems 2
   */
  banners?: Banner[];
}

function BannerCard(
  { image, alt, title, description, link = "#", target = "_blank" }: Banner,
) {
  return (
    <div class="flex flex-col items-center justify-center gap-6 w-full h-full">
      <a
        href={link}
        target={target}
      >
        <Image
          src={image}
          width={642}
          height={414}
          alt={alt}
          loading="lazy"
          fetchPriority="low"
        />
      </a>

      <div class="flex flex-col gap-2 items-center justify-center">
        <h2 class="leading-5 font-bold text-center">{title}</h2>
        {description && (
          <div
            class="text-center leading-4 text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
}

export default function DoubleBanners({ title, banners = [] }: Props) {
  if (!banners || banners.length === 0) return null;

  return (
    <div class="w-full container py-8 flex flex-col gap-10 lg:py-10 max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px]">
      {title && (
        <div
          class="leading-[18px] lg:text-[26px] lg:leading-[30px] text-nowrap"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      <div class="grid lg:grid-cols-2 gap-4 w-full">
        {banners.map((banner) => <BannerCard {...banner} />)}
      </div>
    </div>
  );
}
