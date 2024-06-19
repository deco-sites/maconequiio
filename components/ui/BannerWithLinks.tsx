import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface SizeProps {
  width?: number;
  height?: number;
}

export interface Props {
  title: HTMLWidget;
  /** @format color-input */
  backgroundColor?: string;
  banner: {
    mobileSource: ImageWidget;
    desktopSource: ImageWidget;
    description: string;
    link: string;
    mobileSize?: SizeProps;
    desktopSize?: SizeProps;
  };
  /**
   * @minItems 03
   * @maxItems 03
   */
  links: Array<{ label: string; href: string }>;
}

export default function BannerWithLinks(
  { title, backgroundColor, banner, links = [] }: Props,
) {
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

        <div class="flex flex-col items-center justify-center w-full h-full gap-1">
          <a
            href={banner.link}
            class="flex items-center justify-center w-full h-full"
          >
            <Picture preload={false} class="w-full h-full">
              <Source
                src={banner.mobileSource}
                width={banner.mobileSize?.width || 360}
                height={banner.mobileSize?.height || 120}
                media="(max-width: 767px)"
              />
              <Source
                src={banner.desktopSource}
                width={banner.desktopSize?.width || 1440}
                height={banner.desktopSize?.height || 200}
                media="(min-width: 767px)"
              />
              <img
                loading="lazy"
                class="w-full h-full"
                src={banner.desktopSource}
                alt={banner.description}
              />
            </Picture>
          </a>

          <ul class="grid grid-cols-1 md:grid-cols-3 gap-1.5 items-center justify-center w-full">
            {links.map(({ label, href }) => (
              <li class="flex items-center justify-center w-full bg-blue-dark hover:bg-blue-950 transition-all duration-500 ease-in-out h-16">
                <a
                  href={href}
                  class="flex items-center justify-between w-full text-white-normal px-6 py-2"
                >
                  <span class="font-bold">{label}</span>
                  <Icon id="ChevronRight" size={20} strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
