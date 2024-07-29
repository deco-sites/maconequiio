import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @altBy alt
 */
export interface SecurityItem {
  image: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export default function Security(
  { content }: { content?: { title?: string; items?: SecurityItem[] } },
) {
  return (
    <div class="flex flex-col">
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-2">
          {content.title && (
            <h3 class="font-bold text-sm text-nowrap">
              {content.title}
            </h3>
          )}

          <ul class="flex items-center gap-2 flex-wrap max-w-60">
            {content.items.map((item) => {
              return (
                <li
                  class=""
                  title={item.alt}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.width || 95}
                    height={item.height || 95}
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
  );
}
