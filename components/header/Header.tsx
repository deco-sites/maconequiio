import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { SiteNavigationElement as MobileSiteNavigationElement } from "./Menu.tsx";
import type { AvailableIcons } from "site/components/ui/Icon.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Alert, { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import SearchNavbar from "site/components/header/SearchNavbar.tsx";

/** @title OnlyText */
export interface SiteNavigationOnlyText {
  /**
   * @default SiteNavigationOnlyText
   */
  defaultType: "SiteNavigationOnlyText";
  url: string;
  text: string;
}
/** @title OnlyTextWithTitle */
export interface SiteNavigationOnlyTextWithTitle {
  /**
   * @default SiteNavigationOnlyTextWithTitle
   */
  defaultType: "SiteNavigationOnlyTextWithTitle";
  title: string;
  items: { url: string; text: string; isViewMore?: boolean }[];
}
/** @title ImageAndText */
export interface SiteNavigationImageAndText {
  /**
   * @default SiteNavigationImageAndText
   */
  defaultType: "SiteNavigationImageAndText";
  title: string;
  subItems: {
    image: ImageWidget;
    imageDescription: string;
    text: string;
    url: string;
  }[];
  removeRoundedClass?: boolean;
  type: "grid-cols-1" | "grid-cols-2" | "grid-cols-3" | "grid-cols-6";
}
/** @title Banners */
export interface SiteNavigationBanners {
  /**
   * @default SiteNavigationBanners
   */
  defaultType: "SiteNavigationBanners";
  bannersSubItems: {
    image: ImageWidget;
    imageDescription: string;
    url: string;
    width: number;
    height: number;
  }[];
  layoutType: "grid-cols-1" | "grid-cols-2";
}

/**
 * @title {{{description}}}
 */
export interface Brand {
  image: ImageWidget;
  description: string;
  link: string;
  width?: number;
  height?: number;
}

export type MenuTypes =
  | SiteNavigationOnlyText[]
  | SiteNavigationOnlyTextWithTitle[]
  | SiteNavigationImageAndText[]
  | SiteNavigationBanners[];

export interface SiteNavigationElement {
  category: {
    icon: AvailableIcons;
    width?: number;
    height?: number;
    label: string;
    url: string;
    /** @title SiteNavigationItems */
    items: MenuTypes[];
    brands?: Brand[];
  };
}

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alert?: AlertProps;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Mobile Navigation items
   * @description Navigation items used both on mobile menu
   */
  mobileMenuNavItems?: MobileSiteNavigationElement[];

  /**
   * @title Navigation items
   * @description Navigation items used both on desktop menu
   */
  navItems?: SiteNavigationElement[] | null;

  PLPIntegration?: ProductListingPage | null;

  /** @title Logo */
  logo?: Logo;
}

function Header({
  alert,
  searchbar,
  mobileMenuNavItems = [],
  navItems,
  logo,
  PLPIntegration,
}: Props) {
  const platform = usePlatform();
  const device = useDevice();
  const isDesktop = device === "desktop";
  const items = navItems ?? [];

  const sortOptions = PLPIntegration?.sortOptions ?? [];
  const filters = PLPIntegration?.filters ?? [];

  return (
    <>
      <header
        class={`${PLPIntegration ? "h-[117px]" : "h-[75px]"} xl:h-[160px]`}
      >
        <Drawers
          menu={{ items: mobileMenuNavItems }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-40">
            {alert && isDesktop && (
              <Alert
                benefit={alert.benefit}
                infos={alert.infos}
                backgroundColor={alert.backgroundColor}
              />
            )}
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar }}
              logo={logo}
            />
            {PLPIntegration && !isDesktop && (
              <SearchNavbar
                sortOptions={sortOptions}
                filters={filters}
              />
            )}
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const verifiedUrl = url.pathname === "/" || url.search.includes("skuId");

  return {
    ...props,
    PLPIntegration: !verifiedUrl ? props.PLPIntegration : null,
  };
};

export default Header;
