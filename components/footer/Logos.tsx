import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export interface Logo {
  image: ImageWidget;
  description: string;
  width?: number;
  height?: number;
}

export default function Logos({ logos = [] }: { logos: Logo[] }) {
  return (
    <ul class="flex flex-row items-center gap-2">
      {logos.map(({ image, description, height, width }) => (
        <li>
          <Image
            src={image}
            alt={description}
            width={width || 71}
            height={height || 26}
            loading="lazy"
            fetchPriority="low"
          />
        </li>
      ))}
      <li>
        <PoweredByDeco color="Green" width={86} />
      </li>
    </ul>
  );
}
