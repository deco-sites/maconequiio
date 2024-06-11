import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import type {
  SiteNavigationBanners,
  SiteNavigationElement,
  SiteNavigationImageAndText,
  SiteNavigationOnlyText,
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
            class="flex flex-col gap-1.5 w-full items-start justify-start"
          >
            {textItems.map((item, index) => (
              <a key={index} href={item.url} class="text-sm">
                {item.text}
              </a>
            ))}
          </div>
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
              <div key={index} class="flex flex-col gap-2">
                <span class="font-bold">{item.title}</span>

                <div class={`grid ${item.type} w-full gap-2`}>
                  {item.subItems?.map((subitem) => (
                    <div class="flex flex-row items-center gap-1">
                      <Image
                        class="w-10 h-10 border rounded-full"
                        src={subitem.image}
                        alt={subitem.imageDescription}
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                      <p>{subitem.text}</p>
                    </div>
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
        "width" in itemArray[0] && "height" in itemArray[0]
      ) {
        const bannerItems = itemArray as SiteNavigationBanners[];

        return (
          <div key={arrayIndex} class="flex flex-wrap gap-4">
            {bannerItems.map((item, index) => (
              <div
                key={index}
                class={item.type}
                style={{ width: item.width, height: item.height }}
              >
                <Image
                  src={item.image}
                  alt={item.imageDescription}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                />
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

      {items && (
        <div
          class="fixed hidden group-hover:flex bg-base-100 z-50 items-start gap-16 border-t border-b-2 border-base-200 w-screen py-8 px-12"
          style={{ top: "0px", left: "0px", marginTop: "65px" }}
        >
          {renderItems()}
        </div>
      )}
    </li>
  );
}

export default NavItem;
