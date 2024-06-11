import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";

export interface Props {
  /**
   * @format color-input
   */
  backgroundColor?: string;
  benefit: {
    url?: string;
    text: string;
  };

  dropdown: {
    title: string;
    links: Array<{ url: string; label: string }>;
  };
}

function Alert({ benefit, backgroundColor, dropdown }: Props) {
  return (
    <div
      style={{ backgroundColor }}
      class="flex items-center justify-center w-full h-8"
    >
      <div class="flex justify-between items-center max-w-[75%] mx-auto text-xs font-medium text-white-normal w-full h-full">
        <a href={benefit.url}>{benefit.text}</a>

        <div class="dropdown dropdown-hover h-full">
          <div
            tabIndex={0}
            role="button"
            class="flex items-center justify-center h-full gap-0.5 hover:bg-white-normal hover:text-red duration-300 transition-all px-1.5"
          >
            <span>{dropdown.title}</span>
            <Icon
              id="ChevronDown"
              size={16}
              strokeWidth={1.75}
              class="text-white"
            />
          </div>

          <ul
            tabIndex={0}
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {dropdown?.links?.map((item) => (
              <li class="text-black">
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Alert;
