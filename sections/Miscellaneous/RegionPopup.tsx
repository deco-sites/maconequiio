import type { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import { useScript } from "deco/hooks/useScript.ts";

export interface Props {
  text: HTMLWidget;
}

const changeRegionPopupAttribute = () => {
  const root = globalThis.document.getElementById("popup");

  if (!root) {
    console.warn("Unable to find root element with popup id");
    return;
  }

  root.setAttribute("data-popup-closed", "true");
};

export default function RegionPopup({ text }: Props) {
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
