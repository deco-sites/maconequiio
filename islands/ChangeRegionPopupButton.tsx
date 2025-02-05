import Icon from "site/components/ui/Icon.tsx";

const changeRegionPopupAttribute = () => {
  const root = globalThis.document.getElementById("popup");

  if (!root) {
    console.warn("Unable to find root element with popup id");
    return;
  }

  root.setAttribute("data-popup-closed", "true");

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);
  document.cookie =
    `region-popup=true; expires=${expirationDate.toUTCString()}; path=/`;
};

export default function ChangeRegionPopupButton() {
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
