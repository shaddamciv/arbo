import 'styled-components';

export enum FontFamilyEnum {
  Inter = 'Inter, sans-serif',
  Montserrat = 'Montserrat, sans-serif',
}

type FontTypes = keyof typeof FontFamilyEnum;

interface Fonts {
  Inter: FontFamilyEnum.Inter;
  Montserrat: FontFamilyEnum.Montserrat;
}
interface Colors {
  darkPurple: string;
  deepPurple: string;
  darkPurpleHover: string;
  darkPurpleBorder: string;
  purple: string;
  purpleDisabled: string;
  lightPurple: string;
  white: string;
  dimmedPurple: string;
  dimmedHover: string;
  purpleHighlight: string;
  newMessageColor: string;
  error: string;
  success: string;
  warning: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  placeholder01: string;
  placeholder02: string;
  placeholder03: string;
  placeholder04: string;
  fillsBackground: string;
  fillsOverlay: string;
  fillsStroke: string;
  fillsTextbox: string;
  fillsIcon: string;
  fillsGreen: string;
  fillsRed: string;
  brandPrimary: string;
}
export interface Theme {
  colors: Colors;
  fontFamily: Fonts;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    fontFamily: Fonts;
  }
}
