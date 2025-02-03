import type { Section } from "@deco/deco/blocks";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  section: Section;
  image: {
    src: ImageWidget;
    alt?: string;
    href?: string;
  };
}

export default function ShelfWithImage({ section, image }: Props) {
  if (!section) return null;

  const { Component, props } = section;

  return (
    <div class="container">
      <div class="grid md:grid-cols-2 grid-cols-1 bg-neutral-content">
        <div class="md:max-w-xs mx-auto flex items-center">
          <Component {...props} />
        </div>
        <a href={image.href}>
          <Image
            src={image.src}
            class="w-full h-full object-cover"
            width={720}
            height={640}
            alt={image.alt}
          />
        </a>
      </div>
    </div>
  );
}
