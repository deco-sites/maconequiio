import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import type {
  SiteNavigationBanners,
  SiteNavigationElement,
  SiteNavigationImageAndText,
  SiteNavigationOnlyText,
  SiteNavigationOnlyTextWithTitle,
} from "./Header.tsx";

function NavItem({ category }: SiteNavigationElement) {
  if (!category || !category.icon || !category.label) return null;

  const { icon, label, items, url } = category;

  const renderItems = () => {
    return items.map((itemArray, arrayIndex) => {
      // Verifica se itemArray é um array de SiteNavigationOnlyText
      if (
        Array.isArray(itemArray) && itemArray.length > 0 &&
        "url" in itemArray[0]
      ) {
        const textItems = itemArray as SiteNavigationOnlyText[];

        return (
          <div
            key={arrayIndex}
            class="flex flex-col flex-wrap gap-1.5 w-full items-start justify-start max-h-[320px]"
          >
            {textItems.map((item, index) => (
              <a key={index} href={item.url} class="text-sm">
                {item.text}
              </a>
            ))}
          </div>
        );
      }

      if (
        Array.isArray(itemArray) && itemArray.length > 0 &&
        "title" in itemArray[0] && "items" in itemArray[0]
      ) {
        const textItems = itemArray as SiteNavigationOnlyTextWithTitle[];

        return (
          <>
            {textItems.map(({ items, title }, index) => (
              <div class="flex flex-col gap-6">
                <span class="font-bold">{title}</span>

                <div
                  key={index}
                  class="flex flex-col flex-wrap gap-1.5 w-full items-start justify-start max-h-[320px]"
                >
                  {items.map((item, index) => (
                    <a key={index} href={item.url} class="text-sm">
                      <span
                        class={item.isViewMore
                          ? "text-red underline hover:no-underline"
                          : ""}
                      >
                        {item.text}
                      </span>
                      {item.isViewMore && <span class="text-red">+</span>}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </>
        );
      }

      // Verifica se itemArray é um array de SiteNavigationImageAndText
      if (
        Array.isArray(itemArray) && itemArray.length > 0 &&
        "type" in itemArray[0]
      ) {
        const imageTextItems = itemArray as SiteNavigationImageAndText[];

        return (
          <div key={arrayIndex} class="grid gap-4">
            {imageTextItems.map((item, index) => (
              <div key={index} class="flex flex-col gap-6">
                <span class="font-bold">{item.title}</span>

                <div class={`grid ${item.type} w-full gap-2.5`}>
                  {item.subItems?.map((subitem) => (
                    <a
                      href={subitem.url}
                      class={`flex ${
                        item.type === "grid-cols-1" ? "flex-row" : "flex-col"
                      } items-center gap-1 hover:text-red duration-200 transition-all ease-in-out`}
                    >
                      <Image
                        class={`${
                          item.removeRoundedClass
                            ? "rounded-none"
                            : "border rounded-full"
                        } ${
                          item.type === "grid-cols-1"
                            ? "w-10 h-10"
                            : "w-20 h-20"
                        }`}
                        src={subitem.image}
                        alt={subitem.imageDescription}
                        width={item.type === "grid-cols-1" ? 40 : 80}
                        height={item.type === "grid-cols-1" ? 40 : 80}
                        loading="lazy"
                      />
                      <p class="text-nowrap">{subitem.text}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // Verifica se itemArray é um array de SiteNavigationBanners
      if (
        Array.isArray(itemArray) && itemArray.length > 0 &&
        "layoutType" in itemArray[0]
      ) {
        const bannerItems = itemArray as SiteNavigationBanners[];

        return (
          <div key={arrayIndex} class="flex gap-4">
            {bannerItems.map((item, index) => (
              <div
                key={index}
                class={`grid ${item.layoutType} gap-y-1.5 gap-x-6`}
              >
                {item.bannersSubItems.map((subItem, subItemIndex) => (
                  <a
                    key={subItemIndex}
                    href={subItem.url}
                  >
                    <Image
                      src={subItem.image}
                      alt={subItem.imageDescription}
                      width={subItem.width}
                      height={subItem.height}
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <li class="group flex items-center h-full">
      <a
        href={url}
        class="flex flex-col gap-1.5 items-center justify-between max-w-24 h-full group-hover:bg-gray-300/50 p-1.5 duration-150 transition-all"
      >
        <Icon id={icon} size={20} class="text-red" />
        <span class="text-xs font-bold text-center text-black-neutral">
          {label}
        </span>
      </a>

      {items && items.length > 0 && (
        <div
          class="fixed hidden group-hover:flex bg-base-100 z-50 items-start justify-between gap-16 border-t border-b-2 border-base-200 w-screen max-w-[1260px] -translate-x-1/2 left-1/2 py-8 px-12"
          style={{ top: "0px", marginTop: "65px" }}
        >
          {renderItems()}
        </div>
      )}
    </li>
  );
}

export default NavItem;
