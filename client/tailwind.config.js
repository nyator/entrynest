/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "950px",
      lg: "1024px",
      xl: "1280px",
    },

    fontFamily: {
      sora: ["Sora", "serif"],
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

      colors: {
        primary: "#8B3AE1",
        primaryStroke: "#6B29B0",
        secondary: {
          default: "#",
        },
        gray: "#D9D9D9",
        grayStroke: "#9A9797",
        mred: "#CE0000",
      },

      fontSize: {
        clampHead: "clamp(20px, 5vw, 65px)",
        clampHeadSm: "clamp(17px, 5vw, 40px)",
        clampDesc: "clamp(0.8rem, 1vw, 25px)",
        clampText: "clamp(0.8rem, 2vw, 1rem)",
        clampInputText: "clamp(0.8rem, 1vw, 18px)", 
      },

      backgroundImage: {
        'loginBG': "url(../src/assets/images/loginPhoto.png)",
      },
    },
  },
  plugins: [],
};
