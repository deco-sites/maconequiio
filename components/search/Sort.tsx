import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import Icon from "site/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior Desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const removedLabel = "release:desc";

  return (
    <div class="w-min flex items-center gap-2">
      <Icon id="Sort" size={24} class="text-red" />

      <label for="sort" class="sr-only">Ordenar por</label>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] rounded my-1 cursor-pointer outline-none text-red font-semibold"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => !label.includes(removedLabel)).map((
          { value, label },
        ) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
