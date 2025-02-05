import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name =
        (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
          ?.value;

      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base">Este produto está indisponivel no momento</span>
      <span class="text-sm">Avise-me quando estiver disponivel</span>

      <input placeholder="Nome" class="input input-bordered" name="name" />
      <input placeholder="Email" class="input input-bordered" name="email" />

      <button class="btn disabled:loading" disabled={loading}>Enviar</button>
    </form>
  );
}

export default Notify;
