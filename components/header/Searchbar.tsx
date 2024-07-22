import { headerHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <Modal
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => displaySearchPopup.value = false}
    >
      <div
        class="absolute top-0 left-0 w-screen z-50 bg-base-100 block border-y border-base-200 shadow"
        style={{ marginTop: headerHeight }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>
  );
}

export default SearchbarModal;
