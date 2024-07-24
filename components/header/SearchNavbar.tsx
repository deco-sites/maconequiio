import Sort from "$store/islands/Sort.tsx";
import MobileFilters from "$store/islands/MobileFilters.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  sortOptions: ProductListingPage["sortOptions"];
  filters: ProductListingPage["filters"];
}

export default function SearchNavbar({ sortOptions, filters }: Props) {
  return (
    <div class="xl:hidden flex items-center justify-between w-full h-[42px] px-6 shadow-lg">
      <Sort sortOptions={sortOptions} />

      <MobileFilters filters={filters} />
    </div>
  );
}
