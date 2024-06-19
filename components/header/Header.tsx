import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert, { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import type { SiteNavigationElement as MobileSiteNavigationElement } from "./Menu.tsx";
import type { AvailableIcons } from "deco-sites/maconequiio/components/ui/Icon.tsx";

/** @altBy OnlyText */
export interface SiteNavigationOnlyText {
  url: string;
  text: string;
}
/** @altBy ImageAndText */
export interface SiteNavigationImageAndText {
  title: string;
  subItems: {
    image: ImageWidget;
    imageDescription: string;
    text: string;
    url: string;
  }[];
  type: "grid-cols-1" | "grid-cols-2" | "grid-cols-3";
}
/** @altBy Banners */
export interface SiteNavigationBanners {
  image: ImageWidget;
  imageDescription: string;
  url: string;
  width: number;
  height: number;
  type: "flex-col" | "flex-row";
}

export interface SiteNavigationElement {
  category: {
    icon: AvailableIcons;
    label: string;
    url: string;
    /** @title SiteNavigationItems */
    items: (
      | SiteNavigationOnlyText[]
      | SiteNavigationImageAndText[]
      | SiteNavigationBanners[]
    )[];
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

  /** @title Logo */
  logo?: Logo;
}

function Header({
  alert,
  searchbar,
  mobileMenuNavItems = [],
  navItems,
  logo,
}: Props) {
  const platform = usePlatform();
  const device = useDevice();
  const items = navItems ?? [];

  return (
    <header class="h-[75px] lg:h-[188px]">
      <Drawers
        menu={{ items: mobileMenuNavItems }}
        searchbar={searchbar}
        platform={platform}
      >
        <div class="bg-base-100 fixed w-full z-40">
          {alert && device === "desktop" && (
            <Alert
              benefit={alert.benefit}
              dropdown={alert.dropdown}
              backgroundColor={alert.backgroundColor}
            />
          )}
          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar }}
            logo={logo}
          />
        </div>
      </Drawers>
    </header>
  );
}

export default Header;
