import { useScript } from "@deco/deco/hooks";
import Icon from "site/components/ui/Icon.tsx";
import type { Device } from "apps/website/matchers/device.ts";

const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.set("layout", value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export default function ColumnToggle(
  { isListModeActive = true, device }: {
    isListModeActive: boolean;
    device: Device;
  },
) {
  const isMobile = device === "mobile";

  return (
    <>
      {isMobile && (
        <div class="flex sm:hidden items-center gap-4">
          <button
            aria-label="change elements to grid position"
            class="flex items-center gap-1 hover:cursor-pointer"
            hx-on:click={useScript(applySort, "grid")}
          >
            <Icon
              id="GridColumns"
              size={24}
              class={isListModeActive ? "text-gray-neutral" : "text-red"}
            />
          </button>

          <button
            aria-label="change elements to list position"
            class="flex items-center gap-1 hover:cursor-pointer"
            hx-on:click={useScript(applySort, "list")}
          >
            <Icon
              id="FourColumns"
              size={24}
              class={!isListModeActive ? "text-gray-neutral" : "text-red"}
            />
          </button>
        </div>
      )}

      <div class="hidden sm:flex items-center gap-4">
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
              class={`${
                isListModeActive ? "bg-red" : "bg-gray-neutral"
              } w-1 h-4`}
            />
          ))}
        </button>
      </div>
    </>
  );
}
