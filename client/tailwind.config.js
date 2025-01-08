/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sora: ["Sora", "serif"]

    },
    extend: {
      fontFamily: {
        SatoshiLight: "Satoshi-Light",
        SatoshiLightItalic: "Satoshi-LightItalic",
        SatoshiRegular: "Satoshi-Regular",
        SatoshiItalic: "Satoshi-Italic",
        SatoshiMedium: "Satoshi-Medium",
        SatoshiMediumItalic: "Satoshi-MediumItalic",
        SatoshiBold: "Satoshi-Bold",
        SatoshiBoldItalic: "Satoshi-BoldItalic",
        SatoshiBlack: "Satoshi-Black",
        SatoshiBlackItalic: "Satoshi-BlackItalic",
      },
    },
  },
  plugins: [],
}

