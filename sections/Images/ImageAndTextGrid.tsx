import { Color, ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";

export interface ButtonProps {
  text?: string;
  link?: string;
  backgroundColor?: Color;
  /**
   * @title Tamanho em porcentagem. Ex.: 100%
   * @default "100%"
   */
  width?: string;
  /**
   * @format color
   */
  textColor?: string;
  target: "_blank" | "_self";
  isDisabled?: boolean;
}

export interface Banner {
  bannerImage: {
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
    preload?: boolean;
  };
  /**
   * @format color
   */
  backgroundColor?: string;
  title: RichText;
  description?: RichText;
  button?: ButtonProps;
  mobilePosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  mobileAlignment?: "items-start" | "items-center" | "items-end";
  desktopPosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  desktopAlignment?: "items-start" | "items-center" | "items-end";
  titleAppearsFirst?: boolean;
  hasBorderClass?: boolean;
  hasContainerClass?: boolean;
  maxWidth?:
    | "max-w-[50%]"
    | "max-w-[60%]"
    | "max-w-[70%]"
    | "max-w-[80%]"
    | "max-w-[90%]"
    | "max-w-[95%]"
    | "max-w-full";
}

export interface Props {
  banners?: Banner[];
  itemsPerLine: {
    /** @default 2 */
    mobile: 1 | 2;
    /** @default 4 */
    desktop: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  };
  hasContainerClass?: boolean;
  hasSpacement?: boolean;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
};

const DESKTOP_POSITION: Record<string, string> = {
  "flex-col": "lg:flex-col",
  "flex-row": "lg:flex-row",
  "flex-col-reverse": "lg:flex-col-reverse",
  "flex-row-reverse": "lg:flex-row-reverse",
};

const DESKTOP_ALIGNMENT: Record<string, string> = {
  "items-start": "lg:items-start",
  "items-center": "lg:items-center",
  "items-end": "lg:items-end",
};

function ImageAndText({
  backgroundColor = "#fff",
  title,
  description,
  button,
  bannerImage,
  mobilePosition = "flex-row",
  mobileAlignment = "items-center",
  desktopPosition = "flex-row",
  desktopAlignment = "items-start",
  titleAppearsFirst = false,
  hasBorderClass = false,
  hasContainerClass = false,
  maxWidth = "max-w-full",
}: Banner) {
  return (
    <div
      style={{ backgroundColor }}
      class="flex justify-center w-full h-full items-center"
    >
      <div
        class={clx(
          "flex justify-between w-full h-full items-center gap-3",
          hasContainerClass && "container max-w-[95%] lg:max-w-[1350px]",
          maxWidth,
          mobilePosition,
          mobileAlignment,
          DESKTOP_POSITION[desktopPosition],
          DESKTOP_ALIGNMENT[desktopAlignment],
          hasBorderClass && "rounded-lg",
        )}
      >
        {titleAppearsFirst && (
          <div class="flex flex-col gap-2.5 w-full px-4">
            <div dangerouslySetInnerHTML={{ __html: title || "" }} />

            {description && (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}

        <Image
          src={bannerImage.image}
          alt={bannerImage.description}
          width={bannerImage.width || 350}
          height={bannerImage.height || 350}
          preload={bannerImage.preload || false}
          loading={bannerImage.preload ? "eager" : "lazy"}
        />

        <div
          class={clx(
            "flex flex-col gap-2.5 w-full",
            mobileAlignment,
            DESKTOP_ALIGNMENT[desktopAlignment],
          )}
        >
          {!titleAppearsFirst && (
            <div class="flex flex-col gap-2.5 w-full px-4">
              <div dangerouslySetInnerHTML={{ __html: title || "" }} />
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
          )}
          {button && !button.isDisabled && (
            <a
              href={button.link}
              target={button.target || "_self"}
              style={{
                color: button.textColor,
                backgroundColor: button.backgroundColor,
                width: button.width,
              }}
              class="flex items-center justify-center rounded-lg p-2"
            >
              {button.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ImageAndTextGrid(
  { banners, itemsPerLine, hasContainerClass, hasSpacement }: Props,
) {
  const { mobile, desktop } = itemsPerLine;

  return (
    <div
      class={clx(
        "grid w-full",
        MOBILE_COLUMNS[mobile],
        DESKTOP_COLUMNS[desktop],
        hasSpacement && "gap-6 py-4",
        hasContainerClass && "container",
      )}
    >
      {banners?.map((banner) => <ImageAndText {...banner} />)}
    </div>
  );
}
