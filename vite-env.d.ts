import "vite/client"; //import to fix TS error - `Property 'env' does not exist on type 'ImportMeta'`

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*../firebase" {
  export const firebase: any;
  export const auth: any;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
