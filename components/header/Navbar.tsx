import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { SiteNavigationElement } from "./Header.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
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
import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useScript } from "deco/hooks/useScript.ts";
import User from "deco-sites/maconequiio/components/user/User.tsx";

function Navbar({ items, searchbar, logo }: {
  items?: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
}) {
  const platform = usePlatform();
  const device = useDevice();
  const isDesktop = device === "desktop";

  const onClick = () => {
    const navItems = document.getElementById("nav");

    if (navItems?.classList.contains("flex")) {
      navItems?.classList.remove("flex");
      navItems?.classList.add("hidden");
    } else {
      navItems?.classList.add("flex");
      navItems?.classList.remove("hidden");
    }
  };

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
        <div class="hidden xl:flex flex-col items-center justify-center w-full border-b border-base-200 pt-4 mx-auto">
          <div class="grid grid-cols-3 items-center w-full h-[66px] xl:max-w-[1305px] mx-auto px-6">
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

              <button
                id="navitems-button"
                hx-on:click={useScript(onClick)}
                class="hidden items-center justify-center text-xs gap-1"
              >
                <Icon id="Bars3" size={22} strokeWidth={0.01} />
                <span>Menu</span>
              </button>
            </div>

            <div class="w-full lg:max-w-[640px]">
              <Searchbar searchbar={searchbar} />
            </div>

            <div class="flex-none flex items-center justify-end gap-1.5 col-span-1">
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

          <div
            id="nav"
            class="flex items-center justify-center w-full h-full drop-shadow-md border-t border-t-base-200/50 bg-white-ice"
          >
            <ul class="flex items-center justify-center w-full h-full gap-6 col-span-1">
              {items?.map((item) => <NavItem category={item.category} />)}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
