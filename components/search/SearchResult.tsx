import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { SectionProps } from "@deco/deco";
import { clx } from "$store/sdk/clx.ts";
import Sort from "$store/islands/Sort.tsx";
import ColumnToggle from "site/islands/ColumnToggle.tsx";
import type { Subcategories } from "$store/loaders/Search/subcategories.ts";
import SearchSubcategories from "site/components/search/SearchSubcategories.tsx";
import Pagination from "site/components/search/Pagination.tsx";
import { useDevice } from "@deco/deco/hooks";

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
  subcategories: Subcategories | undefined;
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
  subcategories,
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

  const device = useDevice();
  const isDesktop = device === "desktop";

  return (
    <div
      class={clx(
        "flex items-center justify-center w-full h-full bg-white-base",
        isFirstPage && !isPartial && "border-t border-base-200",
      )}
    >
      <div
        class={`container px-4 ${
          !(!isFirstPage && format == "Show More") ? "xl:py-10" : "xl:pt-10"
        }`}
      >
        <div class="flex flex-row mt-6 gap-x-8 w-full">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside
              class={clx(
                "hidden xl:block w-min min-w-[325px]",
                (isFirstPage && format) == "Show More" &&
                  "xl:max-h-[1380px] xl:overflow-y-auto xl:scrollbar-none",
              )}
            >
              {(isFirstPage && !isPartial) && (
                <Filters filters={filters} hasContainer />
              )}
            </aside>
          )}
          <div class="flex flex-col gap-6 w-full" id={id}>
            {isFirstPage && !isPartial && (
              <div class="flex flex-col w-full">
                <SearchSubcategories subcategories={subcategories?.items} />

                <div class="flex items-center justify-between px-6 w-full bg-white-normal text-black h-12 shadow-sm">
                  <span class="text-sm">
                    <b>{pageInfo.records ?? products.length}</b> itens
                  </span>

                  <div class="flex items-center gap-7">
                    {isDesktop && <Sort sortOptions={sortOptions} />}
                    <ColumnToggle
                      device={device}
                      isListModeActive={isListModeActive}
                    />
                  </div>
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
          <Pagination
            pageInfo={pageInfo}
            zeroIndexedOffsetPage={zeroIndexedOffsetPage}
          />
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

  return <Result {...props} page={page} url={props.url} />;
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);

  if (url.searchParams.get("layout") == "grid") {
    return {
      ...props,
      layout: {
        ...props.layout,
        columns: {
          mobile: 1 as Columns["mobile"],
          desktop: 3 as Columns["desktop"],
        },
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
