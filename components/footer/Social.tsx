import Icon from "$store/components/ui/Icon.tsx";
import type { Color } from "apps/admin/widgets.ts";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Youtube"
    | "Twitter";
  link: string;
  size?: number;
  color?: Color;
}

export default function Social(
  { content, isCentered = false }: {
    content?: { title?: string; items?: SocialItem[] };
    isCentered?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div
          class={`flex flex-col gap-4 ${
            isCentered ? "items-center" : "items-start"
          }`}
        >
          {content.title && (
            <h3 class="font-bold text-base">
              {content.title}
            </h3>
          )}
          <ul class="flex gap-4 flex-wrap items-center">
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block">
                      <Icon
                        size={item.size || 24}
                        id={item.label}
                        style={{ color: item.color }}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
