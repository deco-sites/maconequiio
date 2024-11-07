import type { Details } from "$store/loaders/Search/details.ts";
import { clx } from "deco-sites/maconequiio/sdk/clx.ts";

export interface Props {
  details: Details | undefined;
  hasViewMore?: boolean;
}

export default function SearchDetails({ details, hasViewMore = true }: Props) {
  if (!details || !details.item) return null;

  function handleClick() {
    const content = document.getElementById("toggle-read-more");

    if (content) {
      content.addEventListener("click", () => {
        const description = document.getElementById("read-more");

        if (description) {
          content?.classList?.add("hidden");
          description?.classList?.remove("max-h-[4.4em]", "overflow-hidden");
        }
      });
    }
  }

  return (
    <div class="flex items-center justify-center w-full bg-white-normal py-8">
      <div class="flex flex-col gap-0.5 container p-4">
        <div
          id="read-more"
          dangerouslySetInnerHTML={{ __html: details.item.html }}
          class={clx(hasViewMore && "max-h-[4.4em] overflow-hidden")}
        />

        {hasViewMore && (
          <div
            id="toggle-read-more"
            aria-label="expand content"
            class="underline cursor-pointer"
          >
            Ver mais
          </div>
        )}

        <script
          defer
          dangerouslySetInnerHTML={{ __html: `(${handleClick.toString()})()` }}
        />
      </div>
    </div>
  );
}
