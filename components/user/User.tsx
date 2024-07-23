import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import Button from "deco-sites/maconequiio/components/ui/Button.tsx";

export default function User() {
  return (
    <a href="/account">
      <Button class="btn-circle btn-sm btn-ghost">
        <Icon id="User" size={20} strokeWidth={0.4} class="text-red" />
      </Button>
    </a>
  );
}
