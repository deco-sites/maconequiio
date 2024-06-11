import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert, { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import type { AvailableIcons } from "deco-sites/maconequiio/components/ui/Icon.tsx";

/** @altBy OnlyText */
export interface SiteNavigationOnlyText {
  url: string;
  text: string;
}
/** @altBy ImageAndText */
export interface SiteNavigationImageAndText {
  title: string;
  subItems: { image: ImageWidget; imageDescription: string; text: string }[];
  type: "grid-cols-1" | "grid-cols-2" | "grid-cols-3";
}
/** @altBy Banners */
export interface SiteNavigationBanners {
  image: ImageWidget;
  imageDescription: string;
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
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  buttons?: Buttons;
}

function Header({
  alert,
  searchbar,
  navItems,
  logo,
  buttons,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: [] }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-40">
            {alert && (
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
              buttons={buttons}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
