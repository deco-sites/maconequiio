import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses, {
  type Layout as ColorLayout,
} from "$store/components/footer/ColorClasses.tsx";
import ExtraLinks, {
  Item as ExtraLinksItem,
} from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import PaymentMethods, {
  PaymentItem,
} from "$store/components/footer/PaymentMethods.tsx";
import Social, { SocialItem } from "$store/components/footer/Social.tsx";
import Security, { SecurityItem } from "$store/components/footer/Security.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { RichText } from "apps/admin/widgets.ts";
import AboutUs, {
  Props as AboutUsProps,
} from "deco-sites/maconequiio/components/footer/AboutUs.tsx";
import Logos, {
  Logo,
} from "deco-sites/maconequiio/components/footer/Logos.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

/**
 * @altBy {{{title}}}
 */
export interface Payment {
  title?: string;
  items: PaymentItem[];
}

export interface NewsletterForm {
  placeholder?: {
    email?: string;
    name?: string;
  };
  buttonText?: string;
  helpText?: RichText;
}

export interface Props {
  newsletter?: {
    title?: RichText;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  aboutUs?: AboutUsProps;
  extraLinks?: {
    content: ExtraLinksItem[];
  };
  social?: {
    title?: string;
    items: SocialItem[];
  };
  sections?: Section[];
  payments?: Payment[];
  security?: {
    title?: string;
    items?: SecurityItem[];
  };
  /**
   * @format textarea
   */
  storeInfo?: string;
  logos?: Logo[];
  backToTheTop?: {
    text?: string;
  };
  layout?: ColorLayout;
}

function Footer({
  logos = [],
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/", color: "#fff" }, {
      label: "Tiktok",
      link: "/",
      color: "#fff",
    }],
  },
  aboutUs = {
    title: "Sobre a Maconequi",
    description:
      "Desde 1977, a Maconequi  é referência na distribuição de materiais médicos hospitalares e odontológicos.",
  },
  payments = [{
    title: "Formas de pagamento",
    items: [],
  }],
  security = {
    title: "Segurança e Certificados",
    items: [],
  },
  extraLinks,
  backToTheTop,
  storeInfo,
  layout = {
    backgroundColor: "Base 100",
    hide: {
      newsletter: false,
      about_us: false,
      socialLinks: false,
      sectionLinks: false,
      paymentMethods: false,
      security: false,
      logos: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: true,
      }}
      variation={layout.variation}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify
    />
  );
  const _social = layout?.hide?.socialLinks ? <></> : (
    <Social
      content={social}
      isCentered={layout.variation === "Variation 2"}
    />
  );
  const _payments = layout?.hide?.paymentMethods && !payments
    ? <></>
    : (
      <div class="flex flex-col md:flex-row justify-between gap-6 md:gap-12 lg:gap-16">
        {payments?.map((payment) => (
          <PaymentMethods
            content={payment}
            hasMaxWidth={layout.variation === "Variation 1"}
          />
        ))}
      </div>
    );
  const _security = layout?.hide?.security
    ? <></>
    : <Security content={security} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks?.content} />;
  const _logos = layout?.hide?.logos ? <></> : <Logos logos={logos} />;
  const _about_us = layout?.hide?.about_us ? <></> : <AboutUs {...aboutUs} />;

  return (
    <footer
      class={`w-full flex flex-col md:pb-10 gap-10 ${ColorClasses(layout)}`}
    >
      {layout.variation === "Variation 1" && (
        <div class="flex flex-col">
          {_newsletter}
          <div class="flex items-center justify-center w-full bg-black-neutral">
            <div class="flex flex-col gap-6 md:gap-10 lg:justify-between container md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] px-4 md:px-0 pt-8 pb-4 text-white-normal">
              <div class="flex flex-col md:flex-row md:flex-wrap gap-4 justify-between w-full">
                {_about_us}
                {_links}
                {_social}
              </div>
              {_sectionLinks}
            </div>
          </div>

          <div class="flex flex-col md:justify-between gap-10 md:items-center container md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] pt-4 pb-4 px-4 md:px-0 md:pb-0 bg-black-neutral md:bg-white-normal">
            <div class="flex flex-col md:flex-row justify-between gap-6 md:gap-12 lg:gap-16 w-full text-white-normal md:text-black-neutral">
              <div class="flex flex-col gap-6 md:gap-2">
                <h3 class="font-bold text-sm">
                  Formas de Pagamento
                </h3>
                {_payments}
              </div>
              {_security}
            </div>

            <div class="flex flex-col md:flex-row justify-between gap-6 w-full">
              <span class="block text-white-normal md:text-gray-base text-sm font-normal w-full text-justify">
                {storeInfo}
              </span>
              {_logos}
            </div>
          </div>
        </div>
      )}

      {layout.variation == "Variation 2" && (
        <div class="flex flex-col">
          {_newsletter}
          <div class="flex items-center justify-center w-full">
            <div class="flex flex-col gap-6 md:gap-10 lg:justify-between container md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] px-4 md:px-0 py-8 md:py-12 border-b border-b-black-neutral/40">
              <div class="flex items-center justify-center w-full">
                {_social}
              </div>
              {_sectionLinks}
            </div>
          </div>

          <div class="flex flex-col md:justify-between gap-10 md:items-center container md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] px-4 md:px-0 py-8 md:py-12 border-b border-b-black-neutral/40">
            <div class="flex flex-col md:flex-row justify-between gap-6 md:gap-12 lg:gap-16 w-full">
              <div class="flex flex-col gap-6 md:gap-2">
                <h3 class="font-bold text-sm">
                  Formas de Pagamento
                </h3>
                {_payments}
              </div>
              {_security}
            </div>
          </div>

          <div class="flex flex-col md:justify-between gap-10 md:items-center container md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[1350px] px-4 md:px-0 pt-8 pb-4">
            <div class="flex flex-col md:flex-row justify-between gap-6 w-full">
              <span class="block text-sm font-normal w-full text-justify">
                {storeInfo}
              </span>
              {_logos}
            </div>
          </div>
        </div>
      )}

      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
