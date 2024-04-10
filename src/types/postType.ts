import { tagType } from "./tagType";

export type postType = {
  content: string;
  draftDate: string | "";
  jsonContent: string;
  postId: string;
  publishedDate: string | "";
  readTime: string;
  status: string;
  tags: Array<tagType>;
  title: string;
};
