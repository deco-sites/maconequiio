import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import { RichText } from "apps/admin/widgets.ts";

export interface Form {
  placeholder?: {
    email?: string;
    name?: string;
  };
  buttonText?: string;
  helpText?: RichText;
}

export interface Props {
  content: {
    title?: RichText;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {}, variation = "Variation 1" }: Props & {
    variation?: "Variation 1" | "Variation 2";
  },
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const isSubmitted = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (!email) return;

      await invoke.vtex.actions.newsletter.subscribe({ email, name });
    } finally {
      loading.value = false;
      isSubmitted.value = true;
    }
  };

  if (variation === "Variation 2") {
    return (
      <div class="flex items-center justify-center w-full bg-white-ice py-12 px-4">
        {isSubmitted.value
          ? (
            <h3 class="text-black font-semibold text-sm">
              {"Obrigado por se inscrever. Enviaremos as notícias mais recentes para o seu email :)"}
            </h3>
          )
          : (
            <div class="flex flex-col gap-8 items-center justify-center w-full">
              <h3 class="text-black font-semibold">
                Não perca nenhuma novidade!
              </h3>

              <form
                onSubmit={handleSubmit}
                class="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
              >
                <input
                  required
                  name="name"
                  type="text"
                  placeholder={content?.form?.placeholder?.name || "Nome"}
                  class="placeholder:text-gray-placeholder w-full max-w-[293px] border-b border-b-black p-1 bg-white-ice focus:outline-none focus:border-b-red"
                />

                <input
                  required
                  name="email"
                  type="email"
                  placeholder={content?.form?.placeholder?.email ||
                    "Deixe seu e-mail"}
                  class="placeholder:text-gray-placeholder w-full max-w-[293px] border-b border-b-black p-1 bg-white-ice focus:outline-none focus:border-b-red"
                />

                <button
                  type="submit"
                  class="flex items-center justify-center border border-red rounded-md md:border-none md:bg-red md:rounded-full p-2 md:p-1 w-full md:w-7 md:h-7 disabled:loading max-w-[293px]"
                  disabled={loading}
                >
                  <Icon
                    id="ChevronRight"
                    size={20}
                    class="hidden md:block text-white-normal"
                  />

                  <span class="block md:hidden text-red font-semibold">
                    Receber novidades
                  </span>
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }

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
                    required
                    name="email"
                    class="flex-auto lg:flex-none input lg:w-[500px] text-base-content rounded border-none focus:outline-none pl-4 pr-0"
                    placeholder={content?.form?.placeholder?.email ||
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
