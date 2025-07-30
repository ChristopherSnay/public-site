import type { PostBlock } from "./PostBlock";

export interface Post {
    id: number;
    title: string;
    date: string;
    image: string;
    blocks: PostBlock[];
    tags: string[];
}