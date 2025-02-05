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
import { Product } from "apps/commerce/types.ts";
import { useCallback, useEffect, useRef, useState } from "preact/compat";
import { useSignal } from "@preact/signals";
import { invoke } from "site/runtime.ts";

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
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const query = searchInputRef.current?.value ?? "";

  const loading = useSignal(false);
  const [products, setProducts] = useState<Product[] | null>([]);
  const [searches, setSearches] = useState<{ term: string }[]>([]);

  const hasProducts = Boolean(products?.length ?? 0);
  const hasTerms = Boolean(searches?.length);

  const fetchProducts = useCallback(async (query: string) => {
    loading.value = true;
    try {
      const results = await invoke.shopify.loaders.ProductList({
        props: { query, count: 10 },
      });
      setProducts(results);
      setSearches([{ term: query }]);
    } finally {
      loading.value = false;
    }
  }, [query]);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div class="w-full grid gap-6 max-h-full relative h-full z-[70]">
      <form
        id={id}
        action={action}
        class="flex flex-grow h-[60px] justify-between bg-[#d9d9d9] px-2.5"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="flex-grow w-[80%] bg-[#d9d9d9] outline-none placeholder-shown:sibling:hidden placeholder:text-sm text-sm text-black"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            fetchProducts(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />

        <div class="flex items-center justify-center gap-3">
          <button
            type="submit"
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs" />
              : (
                <Icon
                  id="MagnifyingGlass"
                  size={24}
                  strokeWidth={0.01}
                  fill="none"
                  class="text-[#919191]"
                />
              )}
          </button>

          <button
            type="button"
            class="text-[#919191]"
            onClick={() => displaySearchPopup.value = false}
          >
            <Icon id="XMark" size={24} strokeWidth={2} />
          </button>
        </div>
      </form>

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
