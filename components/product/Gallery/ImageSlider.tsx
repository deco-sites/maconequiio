import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { isVariantOf } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  const images = isVariantOf?.image || [];

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
          {images?.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <img
                class="w-full object-contain"
                sizes="(max-width: 640px) 100vw, 40vw"
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                style={{ aspectRatio }}
                // Preload LCP image for better web vitals
                // preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute bottom-2 right-2 bg-base-100 rounded-full">
          {images && (
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * height / width)}
            />
          )}
        </div>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-1 px-4 sm:px-0 sm:flex-col order-2 sm:order-1 space-y-5">
        {images?.map((img, index) => (
          <li class="carousel-item min-w-[60px]">
            <Slider.Dot index={index}>
              <Image
                style={{ aspectRatio: 1 }}
                class="group-disabled:border-b-4 group-disabled:border-b-red"
                width={60}
                height={60}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}
