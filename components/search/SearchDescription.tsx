import type { ProductListingPage } from "apps/commerce/types.ts";
import Breadcrumb from "deco-sites/maconequiio/components/ui/Breadcrumb.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
}

export default function SearchDescription({ page }: Props) {
  if (!page || !page.seo) return null;

  const { title, description } = page.seo;
  const breadcrumb = page.breadcrumb;

  return (
    <div class="flex items-center justify-center bg-white-normal pb-4">
      <div class="flex flex-col gap-6 container p-4">
        {/* Breadcrumb */}
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />

        <div class="flex flex-col gap-5 text-black-neutral">
          <h1 class="font-bold text-2xl leading-8">{title}</h1>
          <p class="text-sm leading-4">{description}</p>
        </div>
      </div>
    </div>
  );
}
