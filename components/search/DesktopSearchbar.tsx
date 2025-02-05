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
import { Product } from "apps/commerce/types.ts";
import { useCallback, useEffect, useRef, useState } from "preact/compat";
import { useSignal } from "@preact/signals";
import { invoke } from "site/runtime.ts";

export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que você está procurando?
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
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const loading = useSignal(false);
  const [products, setProducts] = useState<Product[] | null>([]);
  const [searches, setSearches] = useState<{ term: string }[]>([]);
  const hasProducts = Boolean(products?.length ?? 0);
  const hasTerms = Boolean(searches?.length ?? 0);

  const notFound = !hasProducts && !hasTerms &&
    (searchInputRef.current && searchInputRef.current.value.length > 0);

  const searchTerm = searchInputRef.current ? searchInputRef.current.value : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, searchTerm]);

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
  }, []);

  return (
    <div class="flex-grow flex flex-col relative z-[70]">
      <form
        id={id}
        action={action}
        class="flex flex-grow relative h-[40px] px-1.5 bg-white-base rounded"
      >
        <input
          ref={searchInputRef}
          id={useId()}
          class="flex-grow w-[80%] bg-white-base outline-none placeholder-shown:sibling:hidden placeholder:text-sm text-sm text-black placeholder:text-gray-base pl-2.5"
          aria-label="Barra de pesquisa"
          aria-expanded={showSuggestions ? "true" : "false"}
          name={name}
          defaultValue=""
          onClick={() => setShowSuggestions(true)}
          onFocus={() => setShowSuggestions(true)}
          onInput={(e) => {
            setShowSuggestions(true);
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
                class={showSuggestions ? "text-red-light" : "text-black"}
              />
            )}
        </button>
      </form>

      {showSuggestions && (
        <div
          ref={modal}
          class="flex flex-col w-full gap-6 absolute flex-grow top-10 lg:top-[52px] px-[15px] pt-2 lg:pt-0 rounded-md max-h-[525px] bg-white-ice lg:shadow-lg overflow-y-auto z-[9999999]"
        >
          {notFound
            ? (
              <span
                class="py-2"
                role="heading"
                aria-level={3}
              >
                Não há sugestões disponíveis
              </span>
            )
            : (
              <>
                {hasTerms && (
                  <div class="flex flex-col pt-6 gap-6 lg:pl-3">
                    {searches.map((search) => (
                      <a
                        href={`/s?q=${search.term}`}
                        class="text-gray-base text-sm leading-4 capitalize"
                      >
                        {search.term}
                      </a>
                    ))}
                  </div>
                )}

                <div
                  class={hasProducts
                    ? "flex flex-col pt-6 pb-2.5 md:pt-1 gap-6 lg:pl-3"
                    : "hidden"}
                >
                  {products?.map(({ isVariantOf, image: images, url }) => {
                    const [front] = images ?? [];

                    return (
                      <a
                        href={url || "#"}
                        class="flex items-center w-full h-full gap-3"
                      >
                        <Image
                          src={front.url || ""}
                          alt={front.alternateName}
                          width={60}
                          height={60}
                          loading="lazy"
                          decoding="async"
                          class="w-[60px] h-[60px] object-contain"
                          preload={false}
                        />

                        <h2
                          class="text-gray-base capitalize font-semibold text-xs pt-1.5 max-w-52 max-h-full"
                          dangerouslySetInnerHTML={{
                            __html: isVariantOf?.name ?? name ??
                              "",
                          }}
                        />
                      </a>
                    );
                  })}
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
