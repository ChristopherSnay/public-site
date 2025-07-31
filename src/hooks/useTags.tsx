import { useEffect, useState } from "react";
import { getPostsV2 } from "../services/postService";

export default function useTags() {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        getPostsV2().then(response => {
            const tagCounts: Record<string, number> = {};

            response.forEach(post => {
                post.tags.forEach((tag: string) => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });

            // Convert to sorted array
            const sortedTags = Object.entries(tagCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([tag]) => tag);

            setTags(["all", ...sortedTags]);
        });
        // getTags().then(response => {
        //     response = [{ id: 0, title: 'all' }, ...response]
        //     setTags(response);
        // });
    }, []);

    return {
        tags
    }
}