import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import DesktopSearchbar from "$store/components/search/DesktopSearchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
  type?: "mobile" | "desktop";
}

function SearchbarModal({ searchbar, type = "desktop" }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  if (type === "mobile") {
    return (
      <>
        {displaySearchPopup.value && (
          <div class="fixed bg-base-100 container h-auto z-[99999]">
            <Searchbar {...searchbar} />
          </div>
        )}
      </>
    );
  }

  return <DesktopSearchbar {...searchbar} />;
}

export default SearchbarModal;
