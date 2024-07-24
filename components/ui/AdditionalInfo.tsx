import type { RichText } from "apps/admin/widgets.ts";

export interface Props {
  html: RichText;
}

export default function AdditionalInfo({ html }: Props) {
  if (!html) return null;

  return (
    <div class="flex flex-col items-center justify-center bg-white-darker px-4 py-3 mb-2 container max-w-[95%] lg:max-w-[1350px] rounded-tl-[24px] rounded-br-[24px] w-full">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
