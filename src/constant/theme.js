import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray

    headingprimary:'£2E3333',
    

    buttonColor :"#28A646",

    iconBackgroundColor : "#B8C5E6",
    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    borderColor:"#E0E0E0",
     placeholderColor:"gray",
     GrayColor:"gray",
    lightGray: "#E8E8E8",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    red :"red",

    fontcolor:"#434848",

      myfont: 'Poppins-Regular',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "sfpro", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "sfpro", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "sfpro", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "sfpro", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "sfpro", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "sfpro", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "sfpro", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "sfpro", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "sfpro", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "sfpro", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;