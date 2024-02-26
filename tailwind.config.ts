import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: {
      red: "#AD2128",
      black: "#000",
      white: {
        base: "#f1f1f1",
        ice: "F8F8F8",
        darker: "#f2f2f2",
      },
      card: "rgba(173,33,40,.1)",
      green: "#108658",
      gray: {
        base: "#606060",
        darker: "#494949",
        lighter: "#BDBDBD",
      },
    },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
