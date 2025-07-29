import { useEffect, useState } from "react";
import type { Post } from "../models/Post";
import { getPosts } from "../services/postService";

export default function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts().then(response => {
            setPosts(response);
        });
    }, []);

    return {
        posts
    }
}