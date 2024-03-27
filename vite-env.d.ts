declare module "*.svg" {
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
