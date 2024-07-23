import type { Details } from "$store/loaders/Search/details.ts";

export interface Props {
  details: Details | undefined;
}

export default function SearchDetails({ details }: Props) {
  if (!details || !details.item) return null;

  return (
    <div class="flex items-center justify-center w-full bg-white-normal py-8">
      <div class="container p-4">
        <div dangerouslySetInnerHTML={{ __html: details.item.html }} />
      </div>
    </div>
  );
}
