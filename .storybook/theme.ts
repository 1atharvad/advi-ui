import { create } from "storybook/theming";

export const adviDocsTheme = create({
  base: "dark",

  colorPrimary: "#e07b39",
  colorSecondary: "#e07b39",

  appBg: "#0c0c0e",
  appContentBg: "#111113",
  appPreviewBg: "#0c0c0e",
  appBorderColor: "#1f1f23",
  appBorderRadius: 8,

  textColor: "#e8f0ef",
  textInverseColor: "#0d1f1f",
  textMutedColor: "#5a8a85",
});

export const adviTheme = create({
  base: "dark",
  brandTitle: "ADVI-UI",
  brandUrl: "/",
  brandImage: "/ad-logo.webp",

  colorPrimary: "#e07b39",
  colorSecondary: "#e07b39",

  appBg: "#0d1f1f",
  appContentBg: "#112424",
  appPreviewBg: "#0d1f1f",
  appBorderColor: "#1e3f3f",
  appBorderRadius: 8,

  textColor: "#e8f0ef",
  textInverseColor: "#0d1f1f",
  textMutedColor: "#5a8a85",

  barTextColor: "#9ececa",
  barHoverColor: "#e07b39",
  barSelectedColor: "#e07b39",
  barBg: "#0a1a1a",

  inputBg: "#1a3333",
  inputBorder: "#2a5050",
  inputTextColor: "#e8f0ef",
  inputBorderRadius: 6,
});
