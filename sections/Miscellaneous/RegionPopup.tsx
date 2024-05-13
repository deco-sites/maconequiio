import type { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";

export interface Props {
  text: HTMLWidget;
}

export default function RegionPopup({ text }: Props) {
  return (
    <div class="transform-gpu w-10/12 mx-auto transition max-w-[900px] fixed bottom-2 z-[70] flex justify-center items-center -translate-x-1/2 left-1/2">
      <div class="flex items-center justify-between bg-red py-5 px-6 rounded-md shadow container mx-auto w-full">
        <div dangerouslySetInnerHTML={{ __html: text }} />

        <button aria-label="close region popup" onClick={() => {}} class="">
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
