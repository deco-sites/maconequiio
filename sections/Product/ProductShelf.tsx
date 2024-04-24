export { default } from "$store/components/product/ProductShelf.tsx";

export function LoadingFallback() {
  return (
    <div
      style={{ height: "486px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
