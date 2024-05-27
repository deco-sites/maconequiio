import Icon from "deco-sites/maconequiio/components/ui/Icon.tsx";

export default function CloseRegionPopupButton() {
  const changeRegionPopupAttribute = () => {
    const root = globalThis.document.getElementById("popup");

    if (!root) {
      console.warn("Unable to find root element with popup id");
      return;
    }

    root.setAttribute("data-popup-closed", "true");
  };

  return (
    <button
      aria-label="close region popup"
      onClick={changeRegionPopupAttribute}
    >
      <Icon
        id="XMark"
        width={24}
        height={24}
        strokeWidth={1.5}
        class="text-white-normal"
      />
    </button>
  );
}
