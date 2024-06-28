import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: HTMLWidget;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const isSubmitted = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
      isSubmitted.value = true;
    }
  };

  return (
    <div class="flex items-center justify-center w-full bg-red h-40 lg:h-24">
      {!isSubmitted.value
        ? (
          <div
            class={`flex items-start lg:items-center container max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] ${
              tiled
                ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
                : "flex-col gap-4"
            }`}
          >
            <div class="flex flex-col gap-4 text-white-normal">
              {content?.title && (
                <div dangerouslySetInnerHTML={{ __html: content.title }} />
              )}
              {content?.description && <div>{content?.description}</div>}
            </div>

            <div class="flex flex-col gap-4 w-full lg:w-auto">
              <form
                class="form-control"
                onSubmit={handleSubmit}
              >
                <div class="flex flex-wrap gap-1 bg-white-normal w-full justify-between rounded pr-4">
                  <input
                    name="email"
                    class="flex-auto lg:flex-none input lg:w-[500px] text-base-content rounded border-none focus:outline-none pl-4 pr-0"
                    placeholder={content?.form?.placeholder ||
                      "Digite seu e-mail"}
                  />
                  <button
                    type="submit"
                    class="disabled:loading"
                    disabled={loading}
                  >
                    <Icon id="SubmitArrow" size={24} />
                  </button>
                </div>
              </form>
              {content?.form?.helpText && (
                <div
                  class="text-sm"
                  dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
                />
              )}
            </div>
          </div>
        )
        : (
          <span class="flex items-center justify-center font-bold text-center px-2 text-lg text-white-normal">
            Obrigado!
          </span>
        )}
    </div>
  );
}

export default Newsletter;
