/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "520px",
      md: "890px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    
    fontFamily: {
      sora: ["Sora", "serif"]
    },

    colors: {
      primary: "#",
      navblack: "#",

      secondary: {
        default: "#",
      },
      blue: "#",
      gray: "#",
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

