/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "Bege": "bg-[#ad7d67] ring-[#ad7d67]",
  "Taupe": "bg-[#a1928b] ring-[#a1928b]",
  "Bronze": "bg[#b68968] ring-[#b68968]",
  "Olinda": "bg-[#9e715b] ring-[#9e715b]",
  "Sahara": "bg-[#845a4a] ring-[#845a4a]",
  "Vermelho": "bg-[#ee1c25] ring-[#ee1c25]",
  "Caqui": "bg-[#a68b76] ring-[#a68b76]",
  "Marrom": "bg-[#563c3b] ring-[#563c3b]",
  "Azul marinho": "bg-[#060a5a] ring-[#060a5a]",
  "Azul%20marinho": "bg-[#060a5a] ring-[#060a5a]",
  "Azul%20Marinho": "bg-[#060a5a] ring-[#060a5a]",
  "Azul": "bg-[#040dfe] ring-[#040dfe]",
  "Mel": "bg-[#c28568] ring-[#c28568]",
  "Castanho": "bg-[#8d553e] ring-[#8d553e]",
  "Vanilla": "bg-[#d6a898] ring-[#d6a898]",
  "Capuccino": "bg-[#d09b89] ring-[#d09b89]",
  "Canela": "bg-[#c27b65] ring-[#c27b65]",
  "Caramelo": "bg-[#bb6b54] ring-[#bb6b54]",
  "Chocolate": "bg-[#9a5746] ring-[#9a5746]",
  "Café": "bg-[#7e5149] ring-[#7e5149]",
  "Verde Limao": "bg-[#32cd32] ring-[#32cd32]",
  "Rosa": "bg-[#e55298] ring-[#e55298]",
  "Preto": "bg-[#000000] ring-[#000000]",
  "Branco": "bg-[#ffffff] ring-[#ffffff]",

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
