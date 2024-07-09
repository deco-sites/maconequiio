import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";

/**
 * @altBy label
 */
export interface Item {
  icon: "Cellphone" | "WhatsappMini" | "Headphone";
  /**
   * @format rich-text
   */
  label: string;
}

export default function ExtraLinks({ content }: { content?: Item[] }) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="hidden md:flex flex-col gap-3.5">
          {content.map((item) => (
            <div class="flex items-center gap-1.5">
              <Icon id={item.icon} size={14} />
              <div
                class="text-sm"
                dangerouslySetInnerHTML={{ __html: item.label || "" }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
