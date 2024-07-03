import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  pageInfo: ProductListingPage["pageInfo"];
  zeroIndexedOffsetPage: number;
}

export default function Pagination({ pageInfo, zeroIndexedOffsetPage }: Props) {
  return (
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
  );
}
