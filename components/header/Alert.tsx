import Icon, {
  AvailableIcons,
} from "site/components/ui/Icon.tsx";

/**
 * @title {{{text}}}
 */
export interface Info {
  icon: {
    source: AvailableIcons;
    width?: number;
    height?: number;
  };
  link: string;
  text: string;
}

export interface Props {
  /**
   * @format color-input
   */
  backgroundColor?: string;
  benefit: {
    url?: string;
    text: string;
  };

  infos: Info[];
}

function Alert({ benefit, backgroundColor, infos = [] }: Props) {
  return (
    <div
      id="alert"
      style={{ backgroundColor }}
      class="flex items-center justify-center w-full h-8"
    >
      <div class="flex justify-between items-center xl:container mx-auto text-xs font-medium text-white-normal w-full h-full px-6">
        <a href={benefit.url}>{benefit.text}</a>

        <ul class="flex items-center justify-end gap-5">
          {infos.map((info) => (
            <li class="flex w-full">
              <a
                href={info.link}
                class="flex items-center justify-center w-full gap-1"
              >
                <Icon
                  id={info.icon.source}
                  width={info.icon.width}
                  height={info.icon.height}
                />
                <span class="text-xs text-nowrap">{info.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Alert;
