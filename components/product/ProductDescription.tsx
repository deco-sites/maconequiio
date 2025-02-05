import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function ProductDescription({ page }: Props) {
  if (!page || !page.product) return null;

  const {
    description: productDescription,
    isVariantOf,
    additionalProperty = [],
  } = page.product;

  const description =
    additionalProperty.find((item) => item.name === "descriptionHtml")?.value ||
    productDescription;

  const productCharacteristics = isVariantOf?.additionalProperty.filter((
    item,
  ) => item.propertyID?.includes("Características"));

  const productSpecifications = isVariantOf?.additionalProperty.filter((item) =>
    item.propertyID === "Especificações Técnicas" &&
    item.name !== "Ref Fabricante"
  );

  const hasVariantAdditionalProperty = productCharacteristics ||
    productSpecifications;

  const undesiredNames = page.product.name?.includes("Estetoscópio");

  return (
    <div
      id="descricao"
      class="flex items-center justify-center w-full h-full py-8 lg:py-10 border-b-4 border-[#E4E4E4]"
    >
      <div class="w-full container flex flex-col gap-8 px-4">
        <h2 class="text-2xl text-black-neutral">
          Descrição do <b>Produto</b>
        </h2>

        <div class="flex flex-col gap-8">
          {!undesiredNames && (
            <div class="flex flex-col gap-7">
              <h3 class="text-black-neutral">
                <b>Descrição</b>
              </h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: description?.replace(/\s{2,}|\n/g, "<br>") || "",
                }}
                class="text-justify"
              />
            </div>
          )}

          {hasVariantAdditionalProperty && (
            <div class="flex flex-col w-full">
              <div class="flex flex-col gap-12 w-full">
                {productCharacteristics && productCharacteristics.length > 0 &&
                  (
                    <div class="flex flex-col gap-6 w-full">
                      <h3 class="text-xl font-bold">
                        Características do Produto
                      </h3>

                      <ul class="flex flex-col w-full">
                        {productCharacteristics?.map((item) => (
                          <li class="grid grid-cols-2 gap-2.5 even:bg-white-normal odd:bg-[#eeeeee] w-full py-3 px-4 text-sm">
                            <span class="font-bold">{item.name}</span>
                            <span>{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {productSpecifications && productSpecifications.length > 0 && (
                  <div class="flex flex-col gap-6 w-full">
                    <h3 class="text-xl font-bold">Especificações Técnicas</h3>

                    <ul class="flex flex-col w-full">
                      {productSpecifications?.map((item) => (
                        <li class="grid grid-cols-2 gap-2.5 even:bg-white-normal odd:bg-[#eeeeee] w-full py-3 px-4 text-sm">
                          <span class="font-bold">{item.name}</span>
                          <span>{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
