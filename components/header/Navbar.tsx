import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { SiteNavigationElement } from "./Header.tsx";
import {
  MenuButton,
  SearchButton,
} from "deco-sites/maconequiio/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Logo } from "$store/components/header/Header.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import User from "deco-sites/maconequiio/components/user/User.tsx";

function Navbar({ items, searchbar, logo }: {
  items?: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
}) {
  const platform = usePlatform();
  const device = useDevice();
  const isDesktop = device === "desktop";

  return (
    <>
      {/* Mobile Version */}
      {!isDesktop && (
        <div
          style={{ height: navbarHeight }}
          class="xl:hidden grid grid-cols-2 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
        >
          <div class="flex justify-start items-center gap-4">
            <MenuButton />
            {logo && (
              <a
                href="/"
                class="flex-grow inline-flex items-center justify-center"
                style={{ minHeight: navbarHeight }}
                aria-label="Store logo"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 100}
                  height={logo.height || 13}
                />
              </a>
            )}
          </div>

          <div class="flex justify-end gap-1">
            <SearchButton />
            {platform === "vtex" && <CartButtonVTEX type="icon" />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
            {platform === "nuvemshop" && <CartButtonNuvemshop />}
          </div>
        </div>
      )}

      {/* Desktop Version */}
      {isDesktop && (
        <div class="hidden xl:flex items-center justify-between gap-1.5 w-full border-b border-base-200 container py-0.5">
          <div class="flex items-center gap-4 justify-start">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 100}
                  height={logo.height || 13}
                />
              </a>
            )}
          </div>

          <ul class="flex-auto flex items-center justify-center h-full">
            {items?.map((item) => <NavItem category={item.category} />)}
          </ul>

          <div class="flex items-center justify-end gap-2">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
            <User />
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX type="icon" />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
