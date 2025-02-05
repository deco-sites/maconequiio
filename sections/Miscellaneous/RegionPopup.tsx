import type { RichText } from "apps/admin/widgets.ts";
import { SectionProps } from "@deco/deco";
import { getCookies } from "std/http/cookie.ts";
import ChangeRegionPopupButton from "site/islands/ChangeRegionPopupButton.tsx";

export interface Props {
  text: RichText;
}

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

        <ChangeRegionPopupButton />
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
