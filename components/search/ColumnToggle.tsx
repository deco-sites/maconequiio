import { useScript } from "deco/hooks/useScript.ts";

const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.set("layout", value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export default function ColumnToggle(
  { isListModeActive = true }: { isListModeActive: boolean },
) {
  return (
    <div class="hidden lg:flex items-center gap-4">
      <button
        aria-label="change elements to grid position"
        class="flex items-center gap-1 hover:cursor-pointer"
        hx-on:click={useScript(applySort, "grid")}
      >
        {Array(3).fill("").map((_) => (
          <div
            class={`${
              !isListModeActive ? "bg-red" : "bg-gray-neutral"
            } w-1 h-4`}
          />
        ))}
      </button>

      <button
        aria-label="change elements to list position"
        class="flex items-center gap-1 hover:cursor-pointer"
        hx-on:click={useScript(applySort, "list")}
      >
        {Array(4).fill("").map((_) => (
          <div
            class={`${isListModeActive ? "bg-red" : "bg-gray-neutral"} w-1 h-4`}
          />
        ))}
      </button>
    </div>
  );
}
