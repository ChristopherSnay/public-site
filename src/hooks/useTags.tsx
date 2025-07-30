import { useEffect, useState } from "react";
import type { Tag } from "../models/Tag";
import { getTags } from "../services/tagService";

export default function useTags() {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        getTags().then(response => {
            response = [{ id: 0, title: 'all' }, ...response]
            setTags(response);
        });
    }, []);

    return {
        tags
    }
}