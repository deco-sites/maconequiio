import { Picture, Source } from "apps/website/components/Picture.tsx";
import { SectionProps } from "@deco/deco";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: {
    content: RichText;
  };
  /** @description text to be rendered on top of the image */
  subtitle?: {
    content: RichText;
  };
  image: {
    /** @description Image for big screens */
    desktop: {
      source: ImageWidget;
      width?: number;
      height?: number;
    };
    /** @description Image for small screens */
    mobile: {
      source: ImageWidget;
      width?: number;
      height?: number;
    };
    /** @description image alt text */
    alt?: string;
  };
}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile: {
          source:
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
          width: 360,
          height: 120,
        },
        desktop: {
          source:
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
          width: 1440,
          height: 200,
        },
        alt: "a",
      },
      matcher: "/*",
      title: {
        content: "<p>Título</p>",
      },
      subtitle: {
        content: "<p>Subtítulo</p>",
      },
    },
  ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile.source}
          width={image.mobile.width || 360}
          height={image.mobile.height || 120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop.source}
          width={image.desktop.width || 1440}
          height={image.desktop.height || 200}
          media="(min-width: 767px)"
        />
        <img
          class="w-full"
          src={image.desktop.source}
          alt={image.alt ?? title?.content}
        />
      </Picture>

      <div class="container flex flex-col gap-4 items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full px-4">
        {title && (
          <div
            dangerouslySetInnerHTML={{ __html: title.content }}
            class="w-full font-medium"
          />
        )}

        {subtitle && (
          <div
            dangerouslySetInnerHTML={{ __html: subtitle.content }}
            class="w-full font-medium"
          />
        )}
      </div>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
