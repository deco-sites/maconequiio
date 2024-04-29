export { default } from "../../components/product/BuyTogether/BuyTogether.tsx";

export function LoadingFallback() {
  return (
    <div
      style={{ height: "436px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
