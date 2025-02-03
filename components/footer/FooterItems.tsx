import { useDevice } from "@deco/deco/hooks";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          {!isMobile && (
            <ul
              class={`hidden md:flex flex-row gap-6 lg:gap-10 w-full ${
                justify && "lg:justify-between"
              }`}
            >
              {sections.map((section) => (
                <li>
                  <div class="flex flex-col gap-2">
                    <span class="font-medium text-lg">
                      {section.label}
                    </span>
                    <ul class={`flex flex-col gap-0.5 flex-wrap text-sm`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-0.5 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile view */}
          {isMobile && (
            <ul class="flex flex-col md:hidden gap-0.5">
              {sections.map((section) => (
                <li>
                  <div class="collapse collapse-arrow">
                    <input
                      aria-label="open collapse"
                      type="checkbox"
                      class="min-h-[0]"
                    />
                    <label
                      htmlFor={section.label}
                      class="collapse-title min-h-[0] !px-0 flex gap-2"
                    >
                      <span>{section.label}</span>
                    </label>
                    <div class="collapse-content">
                      <ul class="flex flex-col gap-1 pt-2">
                        {section.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block py-1 link link-hover"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
