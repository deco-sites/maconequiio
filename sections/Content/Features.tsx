import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { Color, RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
export interface Card {
  icon?: {
    source: AvailableIcons;
    width?: number;
    height?: number;
    color: Color;
  };
  title: RichText;
  text: string;
  cta?: { link: string; label: string };
}

export interface Props {
  title?: string;
  cards: Card[];
}

function FeatureCard({ icon, title, text, cta }: Card) {
  return (
    <div class="flex flex-col items-center justify-center w-full h-48 shadow-lg bg-white-normal rounded-md px-2 py-4">
      {icon && (
        <div class="flex items-center justify-center w-full">
          <Icon
            id={icon.source}
            width={48 || icon.width}
            height={48 || icon.height}
            style={{ color: icon.color }}
          />
        </div>
      )}

      <div class="flex flex-col gap-2 justify-between h-full w-full">
        <div class="flex flex-col gap-2 text-center">
          {title && (
            <div
              class="text-2xl leading-[110%]"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          {text && <p class="leading-[120%] font-bold">{text}</p>}
        </div>

        {cta && (
          <a
            href={cta.link}
            class="flex items-center justify-center w-3/4 h-10 mx-auto p-1.5 rounded-md bg-red text-white-normal font-semibold leading-tight"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

const DEFAULT_CARDS = [
  {
    "source": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
  {
    "source": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
  {
    "source": "Discount" as AvailableIcons,
    "text": ":)",
    "title": "<p>Visit our coupon page!</p>",
  },
];

export default function Features(
  { title, cards = DEFAULT_CARDS }: Props,
) {
  return (
    <div class="flex flex-col justify-center items-center gap-12 p-4">
      {title && (
        <h2 class="font-medium text-[36px] lg:text-[72px] leading-[100%] text-center max-w-4xl z-10">
          {title}
        </h2>
      )}

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {cards?.map((card) => <FeatureCard {...card} />)}
      </div>
    </div>
  );
}
