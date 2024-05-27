import Icon, {
  AvailableIcons,
} from "deco-sites/maconequiio/components/ui/Icon.tsx";

/**
 * @altBy label
 */
export interface BenefitProps {
  icon: AvailableIcons;
  width?: number;
  height?: number;
  label: string;
}

export interface Props {
  /**
   * @maxItems 4
   */
  benefits?: BenefitProps[];
}

function Benefit(
  { icon, label, width, height }: BenefitProps = {
    icon: "ArrowsPointingOut",
    label: "Seu Texto Aqui",
    width: 20,
    height: 20,
  },
) {
  return (
    <div class="flex items-center gap-2 justify-center bg-white-ice py-6 px-4 rounded border border-white-base w-full max-h-[62px] pointer-events-none">
      <Icon id={icon} width={width} height={height} class="text-red" />
      <span class="font-bold text-sm">{label}</span>
    </div>
  );
}

export default function PurchaseBenefits({ benefits = [] }: Props) {
  return (
    <div class="flex items-center justify-center w-full h-full py-12 px-4 xl:px-0">
      <div class="container">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full">
          {benefits.map((benefit) => <Benefit {...benefit} />)}
        </div>
      </div>
    </div>
  );
}
