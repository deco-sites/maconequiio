import type { RichText } from "apps/admin/widgets.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useScript } from "deco/hooks/useScript.ts";
import { SectionProps } from "deco/mod.ts";
import { getCookies } from "std/http/cookie.ts";

export interface Props {
  text: RichText;
}

const changeRegionPopupAttribute = () => {
  const root = globalThis.document.getElementById("popup");

  if (!root) {
    console.warn("Unable to find root element with popup id");
    return;
  }

  root.setAttribute("data-popup-closed", "true");

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);
  document.cookie =
    `region-popup=true; expires=${expirationDate.toUTCString()}; path=/`;
};

export default function RegionPopup(
  { text, hasRegionPopupCookie }: SectionProps<typeof loader>,
) {
  if (hasRegionPopupCookie) return null;

  return (
    <div
      id="popup"
      data-popup-closed="false"
      class="transform-gpu w-10/12 mx-auto transition-all duration-200 max-w-[900px] fixed bottom-2 z-[70] flex justify-center items-center -translate-x-1/2 left-1/2 data-[popup-closed='true']:hidden"
    >
      <div class="flex items-center justify-between bg-red py-5 px-6 rounded-md shadow container mx-auto w-full">
        <div dangerouslySetInnerHTML={{ __html: text }} />

        <button
          aria-label="close region popup"
          hx-on:click={useScript(changeRegionPopupAttribute)}
        >
          <Icon
            id="XMark"
            width={24}
            height={24}
            strokeWidth={1.5}
            class="text-white-normal"
          />
        </button>
      </div>
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const hasRegionPopupCookie = cookies["region-popup"];

  return {
    ...props,
    hasRegionPopupCookie,
  };
};
