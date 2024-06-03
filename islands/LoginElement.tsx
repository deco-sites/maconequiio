import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function LoginElement() {
  const { user } = useUser();

  return (
    <div class="flex items-center justify-center text-sm">
      <div class="flex w-8 h-6 gap-1">
        <Icon id="User" size={24} strokeWidth={0.4} />
      </div>

      <div class="flex flex-col gap-0.5">
        <p>
          Olá! {user?.value?.email
            ? <a href="/account">{user.value?.name || user.value?.email}</a>
            : <a href="/account">Faça seu login</a>}
        </p>
        <p class="flex items-center gap-0.5 text-xs font-bold">
          <a href="/account">Minha Conta</a>
          |
          <a href="/account#/orders">Meus Pedidos</a>
        </p>
      </div>
    </div>
  );
}
