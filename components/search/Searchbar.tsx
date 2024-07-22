/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useRef } from "preact/compat";
import Button from "deco-sites/maconequiio/components/ui/Button.tsx";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div class="flex flex-col p-4 md:py-6 md:px-20">
      <div class="flex items-center gap-4">
        <form
          id={id}
          action={action}
          class="flex-grow flex gap-3 px-3 border border-base-200"
        >
          <Button
            class="btn-ghost"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
          >
            <Icon
              class="text-black-neutral"
              id="MagnifyingGlass"
              size={24}
              strokeWidth={0.01}
            />
          </Button>

          <input
            ref={searchInputRef}
            id="search-input"
            class="flex-grow outline-none placeholder-shown:sibling:hidden"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />

          <button
            type="button"
            aria-label="Clean search"
            class="focus:outline-none"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              setQuery("");
            }}
          >
            <span class="text-sm">limpar</span>
          </button>
        </form>

        <button
          class="hidden xl:inline-flex btn btn-ghost btn-circle"
          onClick={() => (displaySearchPopup.value = false)}
        >
          <Icon id="XMark" width={20} height={20} strokeWidth={2} />
        </button>
      </div>

      <div
        class={`${!hasProducts && !hasTerms ? "hidden" : "pb-12 h-full"}`}
      >
        <div class="gap-4 grid grid-cols-1 px-2 h-full">
          <div class="flex flex-col gap-2 overflow-y-auto max-h-[50%] h-full">
            {products?.map(({ isVariantOf, image: images, url }) => {
              const [front] = images ?? [];

              return (
                <a
                  href={url || "#"}
                  class="flex items-center w-full h-full gap-3"
                >
                  <Image
                    src={front.url?.replace("-25-25", "-60-60") || ""}
                    alt={front.alternateName}
                    width={60}
                    height={60}
                    loading="lazy"
                    decoding="async"
                    preload={false}
                  />

                  <h2
                    class="truncate text-black uppercase font-semibold text-xs pt-1.5"
                    dangerouslySetInnerHTML={{
                      __html: isVariantOf?.name ?? name ??
                        "",
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
