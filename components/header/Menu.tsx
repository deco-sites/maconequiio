import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SiteNavigationElement {
  icon: {
    id: AvailableIcons;
    strokeWidth?: number;
    width: number;
    height: number;
  };
  name: string;
  children: Array<{ name: string; url: string }>;
}

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-arrow">
      <input type="checkbox" />
      <div class="collapse-title">
        <div class="flex items-center gap-2 w-full">
          <Icon
            id={item.icon.id}
            strokeWidth={item.icon.strokeWidth ?? 1}
            width={item.icon.width}
            height={item.icon.height}
            class="text-red"
          />
          <span class="text-sm text-black-neutral leading-6">{item.name}</span>
        </div>
      </div>

      <div class="collapse-content p-0">
        <ul class="flex flex-col gap-2 bg-white-base py-6">
          {item.children?.map(({ name, url }) => (
            <li class="flex items-center w-full justify-between pl-6 pr-1.5">
              <a
                href={url}
                class="w-full block font-normal text-sm leading-6 py-0.5"
              >
                {name}
              </a>
              <Icon id="ChevronRight" strokeWidth={2.75} size={20} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full max-h-full overflow-y-auto scrollbar">
      <ul class="flex-grow flex flex-col divide-y divide-base-200 text-black-neutral">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 text-sm text-black-neutral">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/institucional/fale-conosco"
          >
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/institucional/lojas-fisicas"
          >
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
