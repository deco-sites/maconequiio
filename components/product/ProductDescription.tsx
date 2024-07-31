import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function ProductDescription({ page }: Props) {
  if (!page || !page.product) return null;

  const { description: productDescription, isVariantOf } = page.product;

  const description = productDescription || isVariantOf?.description || "";

  const properties =
    isVariantOf?.additionalProperty?.filter((item) =>
      item.propertyID === "allSpecifications"
    ) ?? [];

  return (
    <div
      id="descricao"
      class="flex items-center justify-center w-full h-full py-8 lg:py-10 border-b-4 border-[#E4E4E4]"
    >
      <div class="w-full container flex flex-col gap-8">
        <h2 class="text-2xl text-black-neutral px-4">
          Descrição do <b>Produto</b>
        </h2>

        <div class="flex flex-col gap-8 px-6">
          <div class="flex flex-col gap-7">
            <h3 class="text-black-neutral">
              <b>Descrição</b>
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: description.replace(/\r?\n/g, "<br />").replace(
                  "iframe",
                  "iframe loading='lazy'",
                ),
              }}
            />
          </div>

          <div class="flex flex-col gap-7">
            <h3 class="text-black-neutral">
              <b>Características</b>
            </h3>

            {properties.filter((item) =>
              item.name !== "sellerId" && item.name !== "Tabela de Medidas" &&
              !item.name?.toLowerCase().includes("selecione a opção de")
            )?.map((property) => (
              <div class="even:bg-[#EEEEEE] odd:bg-white-normal grid grid-cols-2 w-full text-sm leading-6 px-4">
                <span class="text-[#444] font-bold">{property.name}</span>
                <span>{property.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
