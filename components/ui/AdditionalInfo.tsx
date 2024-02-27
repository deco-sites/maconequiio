import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  html: HTMLWidget;
}

export default function AdditionalInfo({ html }: Props) {
  if (!html) return null;

  return (
    <div class="flex flex-col items-center justify-center bg-white-darker px-2 py-3 mb-2 container max-w-[95%] lg:max-w-[1305px] rounded-tl-[24px] rounded-br-[24px] w-full">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
