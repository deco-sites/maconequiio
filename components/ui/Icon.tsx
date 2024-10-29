import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "Aparelhos"
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "EmptyCart"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Guard"
  | "CartIcon"
  | "Check"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "Equals"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "PlusNew"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "WhatsappMini"
  | "Headphone"
  | "Cellphone"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "Menu"
  | "MenuIcon"
  | "Estetoscopio"
  | "Sort"
  | "SaudeIcon"
  | "SubmitArrow"
  | "Bolsa"
  | "GridColumns"
  | "FourColumns"
  | "MonitorPressao"
  | "Ostomia"
  | "Atleta"
  | "Meias"
  | "Ortopedista"
  | "Cadeira"
  | "Curativo"
  | "Seringa"
  | "Coração"
  | "MonitorPressao"
  | "Share"
  | "Youtube"
  | "BenefitsGuard"
  | "Store";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
