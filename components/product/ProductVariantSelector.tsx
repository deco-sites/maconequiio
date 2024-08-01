import Avatar from "$store/components/ui/Avatar.tsx";
import { type Possibilities } from "$store/sdk/useVariantPossiblities.ts";
import { relative } from "$store/sdk/url.ts";

interface Props {
  possibilities: Possibilities;
  url: string;
}

function VariantSelector({ possibilities, url }: Props) {
  return (
    <div class="flex flex-col mt-4 sm:mt-6">
      <ul class="flex flex-col gap-4">
        {Object.keys(possibilities).map((name) => {
          return (
            <li class="flex flex-col gap-2">
              <span class="text-sm font-medium text-black-neutral">{name}</span>
              <ul class="flex flex-wrap flex-row gap-3">
                {Object.entries(possibilities[name]).map(([value, link]) => {
                  const relativeUrl = relative(url);
                  const relativeLink = relative(link);

                  return (
                    <li class="h-8">
                      <button
                        title={value}
                        f-partial={relativeLink}
                        f-client-nav
                      >
                        <Avatar
                          content={value}
                          variant={relativeLink === relativeUrl
                            ? "active"
                            : relativeLink
                            ? "default"
                            : "disabled"}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VariantSelector;
