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
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useRef } from "preact/compat";
import Button from "deco-sites/maconequiio/components/ui/Button.tsx";
import Image from "apps/website/components/Image.tsx";
import { relative } from "deco-sites/maconequiio/sdk/url.ts";
import {
  formatInstallments,
  formatPrice,
} from "deco-sites/maconequiio/sdk/format.ts";
import { useOffer } from "deco-sites/maconequiio/sdk/useOffer.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Spinner from "deco-sites/maconequiio/components/ui/Spinner.tsx";

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
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (displaySearchPopup.value) {
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

      <div class="flex flex-col gap-6 divide-y divide-base-200 mt-6 empty:mt-0 md:flex-row md:divide-y-0">
        {notFound
          ? (
            <div class="py-16 md:py-6! flex flex-col gap-4 w-full">
              <span
                class="font-medium text-xl text-center"
                role="heading"
                aria-level={3}
              >
                Nenhum resultado encontrado
              </span>
              <span class="text-center text-black-neutral">
                Vamos tentar de outro jeito? Verifique a ortografia ou use um
                termo diferente
              </span>
            </div>
          )
          : (
            <>
              <div class="flex flex-col gap-6 md:w-[15.25rem] md:max-w-[15.25rem]\">
                <div class="flex gap-2 items-center">
                  <span
                    class="font-medium text-xl"
                    role="heading"
                    aria-level={3}
                  >
                    Sugestões
                  </span>
                  {loading.value && <Spinner />}
                </div>
                <ul id="search-suggestion" class="flex flex-col gap-6">
                  {searches?.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        <span>
                          <Icon
                            id="MagnifyingGlass"
                            size={27}
                            strokeWidth={0.01}
                          />
                        </span>
                        <span>
                          {term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden flex-1">
                <div class="flex gap-2 items-center">
                  <span
                    class="font-medium text-xl"
                    role="heading"
                    aria-level={3}
                  >
                    Produtos sugeridos
                  </span>
                  {loading.value && <Spinner />}
                </div>
                <Slider class="carousel gap-4 ">
                  {products?.map((product, index) => {
                    const { isVariantOf, image: images, url, offers } = product;
                    const [front] = images ?? [];

                    const WIDTH = 200;
                    const HEIGHT = 150;

                    const { listPrice, price, installments, availability } =
                      useOffer(
                        offers,
                      );

                    const inStock =
                      availability === "https://schema.org/InStock";

                    return (
                      <Slider.Item
                        index={index}
                        class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                      >
                        <div
                          class="card card-compact group w-full h-full"
                          data-deco="view-product"
                        >
                          <SendEventOnClick
                            id={id}
                            event={{
                              name: "select_item" as const,
                              params: {
                                item_list_name: "suggestions",
                                items: [
                                  mapProductToAnalyticsItem({
                                    product,
                                    price,
                                    listPrice,
                                    index,
                                  }),
                                ],
                              },
                            }}
                          />
                          <figure
                            class="relative"
                            style={{ aspectRatio: WIDTH / HEIGHT }}
                          >
                            <a
                              href={url && relative(url)}
                              aria-label="view product"
                              class="contents"
                            >
                              <Image
                                src={front.url!}
                                alt={front.alternateName}
                                width={WIDTH}
                                height={HEIGHT}
                                class="col-span-full row-span-full rounded w-full h-[150px] object-contain"
                                sizes="(max-width: 640px) 50vw, 20vw"
                                loading="lazy"
                                decoding="async"
                              />
                            </a>
                          </figure>

                          <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
                            <div class="flex flex-col mb-2 h-full">
                              <h2 class="line-clamp-2 text-sm text-black-neutral uppercase font-medium leading-4">
                                {isVariantOf?.name ?? name}
                              </h2>
                            </div>

                            {inStock &&
                              (
                                <div class="flex flex-col gap-2">
                                  <div class="flex flex-col gap-0 lg:flex-row lg:gap-2">
                                    {(listPrice ?? 0) > (price ?? 0) && (
                                      <div class="line-through text-gray-base text-xs leading-3">
                                        de: {formatPrice(
                                          listPrice,
                                          offers?.priceCurrency,
                                        )}
                                      </div>
                                    )}

                                    <div class="text-base">
                                      {formatPrice(
                                        price,
                                        offers!.priceCurrency!,
                                      )}
                                    </div>
                                  </div>

                                  {!installments
                                    ? ""
                                    : (
                                      <div class="text-neutral text-sm lg:text-base">
                                        ou {formatInstallments(installments)}
                                      </div>
                                    )}
                                </div>
                              )}

                            <div class="flex-auto flex items-end">
                              <a
                                href={url && relative(url)}
                                aria-label="view product"
                                class="btn btn-block bg-red text-white-normal hover:bg-red/90"
                              >
                                {inStock ? "Ver produto" : "Indisponível"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </Slider.Item>
                    );
                  })}
                </Slider>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default Searchbar;
