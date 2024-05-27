import type { HTMLWidget } from "apps/admin/widgets.ts";
import CloseRegionPopupButton from "deco-sites/maconequiio/islands/CloseRegionPopupButton.tsx";

export interface Props {
  text: HTMLWidget;
}

export default function RegionPopup({ text }: Props) {
  return (
    <div
      id="popup"
      data-popup-closed="false"
      class="transform-gpu w-10/12 mx-auto transition-all duration-200 max-w-[900px] fixed bottom-2 z-[70] flex justify-center items-center -translate-x-1/2 left-1/2 data-[popup-closed='true']:hidden"
    >
      <div class="flex items-center justify-between bg-red py-5 px-6 rounded-md shadow container mx-auto w-full">
        <div dangerouslySetInnerHTML={{ __html: text }} />

        <CloseRegionPopupButton />
      </div>
    </div>
  );
}
