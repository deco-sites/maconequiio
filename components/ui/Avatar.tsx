/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "Azul": "bg-[#87CEFA] ring-[#87CEFA]",
  "Branco": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "Cinza": "bg-[#808080] ring-[#808080]",
  "Natural Escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "Natural": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "Laranja": "bg-[#FFA500] ring-[#FFA500]",
  "Marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "Preto": "bg-black ring-black",
  "Verde": "bg-[#90EE90] ring-[#90EE90]",
  "Vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "text-base-content border-black",
  "disabled": "",
  "default": "text-base-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-base-content border-black",
  disabled:
    "opacity-50 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:h-[1px] after:bg-gray-400 after:w-1/2 after:block after:rotate-45 after:content-['']",
  default: "text-base-content",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="placeholder w-full text-sm font-light">
      <div
        class={`placeholder border rounded-md px-2 py-1 h-8 min-w-8 ${
          colors[content] ?? colors[variant]
        } ${variants[variant]}`}
      >
        <span class="uppercase">
          {colors[content] ? "" : content}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
