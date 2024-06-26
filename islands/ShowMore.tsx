import { PageInfo } from "apps/commerce/types.ts";
import type { ComponentChildren } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import { useShowMore } from "../sdk/useShowMore.ts";

export interface Props {
  children: ComponentChildren;
  pageInfo: PageInfo;
}

export default function ShowMore(
  { children, pageInfo }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isFirstPage = !pageInfo.previousPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (!isFirstPage) {
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div
      class={(isAtPage && pageInfo.nextPage)
        ? "flex justify-center col-span-full pb-6"
        : "hidden"}
    >
      {children}
      <button
        class={`btn cursor-pointer absolute bg-red hover:bg-red text-white-base font-bold rounded-md ${
          loading.value ? "hidden" : ""
        }`}
        onClick={() => {
          loading.value = true;
          const element = document.getElementById(
            `show-more-button-${loadedPage}`,
          );
          if (element) {
            element.click();
          }
          if (pageInfo.nextPage) {
            const url = new URL(pageInfo.nextPage, window.location.href);
            url.searchParams.delete("partial");
            window.history.replaceState({}, "", url.toString());
          }
        }}
      >
        Ver mais produtos
      </button>
    </div>
  );
}
