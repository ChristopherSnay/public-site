import { useCallback, useEffect, useState } from "react";
import type { Post } from "../models/Post";
import { getPostsV2 } from "../services/postService";

export default function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    const getById = useCallback((id: number): Promise<Post | undefined> => {
        if (posts?.length > 0) {
            const match = posts.find(x => x.id == id);
            return Promise.resolve(match);
        } else {
            return getPostsV2().then(results => results.find(x => x.id == id));
        }

    }, [posts]);


    useEffect(() => {
        getPostsV2().then(response => {
            setPosts(response.sort((a: Post, b: Post) => new Date(a.date) < new Date(b.date) ? 1 : -1));
        });
    }, []);

    return {
        posts,
        getById
    }
}