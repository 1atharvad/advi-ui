/// <reference types="vite/client" />

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "@fontsource/raleway";
declare module "@fontsource/unbounded";
declare module "@fontsource/rubik";
declare module "@fontsource-variable/geist";
