/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "300px",
      sm: "600px",
      o: "800px",
      md: "950px",
      lg: "1350px",
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
        mblack: "#2D2D2E"
      },

      fontSize: {
        clampHead: "clamp(25px, 5vw, 65px)",
        clampHeadM: "clamp(1px, 3vw, 25px)",
        clampHeadSm: "clamp(17px, 5vw, 40px)",
        clampHeadXs: "clamp(30px, 3vw, 40px)",
        clampDesc: "clamp(0.7rem, 1vw, 25px)",
        clampSm: "clamp(0.7rem, 1vw, 0.8rem)",
        clampText: "clamp(0.8rem, 2vw, 1rem)",
        clampInputText: "clamp(0.8rem, 1vw, 18px)", 
        breadcrumb: "clamp(0.6rem, 2vw, 0.8rem)",
        jobcard1: "clamp(0.8rem, 1vw, 1rem)",
      },

      backgroundImage: {
        'loginBG': "url(../src/assets/images/loginPhoto.png)",
        'unhBG': "url(../src/assets/images/unh.jpg)",
        'fr': "url(../src/assets/images/fr.jpg)",
        'africanBackground': "url(../src/assets/images/african-background.jpg)",
        'africanBackground2': "url(../src/assets/images/african-background2.jpg)",
        'africanBackground3': "url(../src/assets/images/african-background3.jpg)",
        'africanBackground4': "url(../src/assets/images/african-background4.jpg)",
        'africanBackground5': "url(../src/assets/images/african-background5.jpg)",
        'africanBackground6': "url(../src/assets/images/african-background6.jpg)",
      },
    },
  },
  plugins: [],
};
