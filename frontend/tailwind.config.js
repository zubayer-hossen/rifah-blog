/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7F2",
        blush: {
          DEFAULT: "#FF6F91",
          light: "#FFB3C6",
          dark: "#E14E72",
        },
        lavender: {
          DEFAULT: "#A78BFA",
          light: "#D6C9FF",
        },
        plum: "#3D1F3B",
        gold: "#FFC15E",
        mint: "#8FE3CF",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Quicksand", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.18)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" },
          "50%": { borderRadius: "58% 42% 35% 65% / 55% 60% 40% 45%" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseHeart: "pulseHeart 1.4s ease-in-out infinite",
        blob: "blob 9s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(225, 78, 114, 0.25)",
      },
    },
  },
  plugins: [],
};
