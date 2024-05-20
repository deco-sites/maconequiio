import Image from "apps/website/components/Image.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { relative } from "$store/sdk/url.ts";
import { formatPrice } from "$store/sdk/format.ts";

import type { Product } from "apps/commerce/types.ts";

export interface Props {
  product: Product;
  hasViewProductLink?: boolean;
}

const WIDTH = 183;
const HEIGHT = 183;

export default function BuyTogetherCard(
  { product, hasViewProductLink = false }: Props,
) {
  const { url, name, image: images, offers } = product;
  const [front] = images ?? [];
  const { listPrice, price } = useOffer(offers);

  const discount = Math.round(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  return (
    <div class="flex flex-row xl:flex-col rounded w-full xl:w-[218px] h-32 xl:h-[374px] bg-white-normal border border-[#BEBEBE] p-3">
      <figure
        class="relative"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <div class="absolute top-2 z-10 flex items-center left-1/2">
          <div class=""></div>
        </div>

        {/* Product Images */}
        <div class="grid grid-cols-1 grid-rows-1 w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="col-span-full row-span-full rounded w-full"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </div>
      </figure>

      <div class="flex flex-col gap-1 pt-3 border-l border-l-white-base xl:border-l-0 xl:border-t xl:border-t-white-base h-full justify-between">
        <h2
          class="line-clamp-3 text-sm text-black-neutral uppercase font-medium leading-4"
          dangerouslySetInnerHTML={{ __html: name ?? "" }}
        />

        {hasViewProductLink && (
          <a
            href={url && relative(url)}
            class="underline text-red text-sm font-medium"
          >
            {"Ver produto >"}
          </a>
        )}

        <div class="flex w-full items-center justify-between gap-2">
          <div class="flex flex-col gap-0.5">
            <div class="line-through text-gray-base text-xs leading-3">
              de: {formatPrice(listPrice, offers?.priceCurrency)}
            </div>

            <div class="text-black-neutral text-sm font-bold leading-4">
              por: {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>

          {discount > 0 && (
            <div class="flex items-center justify-center text-xs leading-3 font-bold bg-red-light text-white-normal w-10 h-8 p-0.5 rounded-tl-2xl rounded-br-2xl">
              -{discount}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
