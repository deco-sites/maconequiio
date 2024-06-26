import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
// import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { SectionProps } from "deco/types.ts";
import Sort from "$store/islands/Sort.tsx";
import ColumnToggle from "deco-sites/maconequiio/components/search/ColumnToggle.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: _url,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  const isListModeActive = layout?.columns?.desktop === 4;

  return (
    <div class="flex items-center justify-center w-full h-full bg-white-base border-t border-t-base-200">
      <div
        class={`container px-4 ${
          !(!isFirstPage && format == "Show More") ? "sm:pt-10" : ""
        }`}
      >
        {
          /* {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            displayFilter={layout?.variant === "drawer"}
          />
        )} */
        }

        <div class="flex flex-row mt-6 gap-x-8">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[325px]">
              {(isFirstPage && !isPartial) && (
                <Filters filters={filters} hasContainer />
              )}
            </aside>
          )}
          <div class="flex flex-col gap-6 flex-grow" id={id}>
            {isFirstPage && !isPartial && (
              <div class="flex items-center justify-between px-6 w-full bg-white-normal text-black h-12 shadow-sm">
                <span class="text-sm">
                  <b>{pageInfo.records}</b> itens
                </span>

                <div class="flex items-center gap-7">
                  <Sort sortOptions={sortOptions} />
                  <ColumnToggle isListModeActive={isListModeActive} />
                </div>
              </div>
            )}

            <ProductGallery
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Página {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </div>
  );
}

function SearchResult(
  { page, ...props }: SectionProps<typeof loader>,
) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);

  if (url.searchParams.get("layout") == "grid") {
    return {
      ...props,
      layout: {
        ...props.layout,
        columns: { desktop: 3 as Columns["desktop"] },
      },
      url: req.url,
    };
  }

  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
