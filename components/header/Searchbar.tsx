import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar || !displaySearchPopup.value) {
    return null;
  }

  return (
    <div class="block border-y border-base-200 shadow absolute left-0 top-[100%] w-screen z-50 bg-base-100">
      <Searchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;
