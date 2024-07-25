import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @altBy alt
 */
export interface PaymentItem {
  image: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export default function PaymentMethods(
  { content, hasMaxWidth = false }: {
    content?: { title?: string; items?: PaymentItem[] };
    hasMaxWidth?: boolean;
  },
) {
  return (
    <div class="flex flex-col gap-2 w-full">
      <div class="flex items-center justify-between w-full">
        {content && content.items && content.items.length > 0 && (
          <div class="flex flex-col gap-2">
            {content.title && (
              <h3 class="text-xs text-white-normal md:text-black-neutral font-medium leading-5">
                {content.title}
              </h3>
            )}

            <ul
              class={`flex items-center gap-2 ${
                hasMaxWidth ? "flex-wrap max-w-72" : "flex-row w-full"
              }`}
            >
              {content.items.map((item) => {
                return (
                  <li
                    class={!hasMaxWidth ? "w-full" : ""}
                    title={item.alt}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={item.width || 47}
                      height={item.height || 28}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
