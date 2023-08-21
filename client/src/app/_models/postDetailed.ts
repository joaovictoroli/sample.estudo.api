import { Reply } from "./reply";

export interface PostDetailed {
    postId: string;
    title: string;
    content: number,
    releaseDate: Date,
    userId: number,
    replies: Reply[]
  }