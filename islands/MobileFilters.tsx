import Drawer from "$store/components/ui/Drawer.tsx";
import Button from "deco-sites/maconequiio/components/ui/Button.tsx";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import Filters from "deco-sites/maconequiio/components/search/Filters.tsx";
import { useSignal } from "@preact/signals";
import { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  filters: ProductListingPage["filters"];
}

export default function MobileFilters({ filters }: Props) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      class="!w-auto"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-3/4">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <Button
        hasBtnClass={false}
        class="flex items-center gap-1 text-red"
        onClick={() => {
          open.value = true;
        }}
      >
        <Icon id="FilterList" size={24} />
        <span class="text-sm font-semibold">Filtrar</span>
      </Button>
    </Drawer>
  );
}
