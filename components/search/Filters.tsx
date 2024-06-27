import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
  hasContainer?: boolean;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox w-4 h-4 border border-black"
      />
      <span class="text-sm">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" ? "flex-row" : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function ToggleFilters({ filters }: Pick<Props, "filters">) {
  return (
    <ul class="flex flex-col gap-1.5 px-2">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex">
            <div class="collapse collapse-arrow p-0 rounded-none">
              <input
                type="checkbox"
                name="pdc-filters"
                class="min-h-0"
                aria-label="Filtros"
                checked={filter.values.some((item) => item.selected)}
              />
              <div class="collapse-title flex justify-between cursor-pointer border-b">
                <span class="flex content-center flex-wrap">
                  {filter.label}
                </span>
              </div>

              <div class="collapse-content pb-0 pt-3 overflow-auto max-h-64 scrollbar">
                <FilterValues {...filter} />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

function Filters({ filters, hasContainer = false }: Props) {
  if (hasContainer) {
    return (
      <div class="flex flex-col w-full border gap-1 bg-white-normal text-black">
        <div class="flex w-full py-3 px-4 font-medium bg-white-base text-lg">
          Filtros
        </div>
        <ToggleFilters filters={filters} />
      </div>
    );
  }

  return <ToggleFilters filters={filters} />;
}

export default Filters;
