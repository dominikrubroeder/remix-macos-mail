import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        cleanFadeUp: "cleanFadeUp .3s ease-out forwards",
      },
      keyframes: {
        cleanFadeUp: {
          "0%": {
            transform: "translateY(4%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
