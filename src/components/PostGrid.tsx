import { Chip, Pagination } from "@mui/material";
import { useMemo, useState } from "react";
import { CONFIG } from "../constants/config";
import usePosts from "../hooks/usePosts";
import useTags from "../hooks/useTags";
import type { Post } from "../models/Post";
import PostCard from "./PostCard";
import PostDialog from "./PostDialog";

export default function PostGrid() {
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [showPostDialog, setShowPostDialog] = useState<number | null>(null);
    const [page, setPage] = useState<number>(1);
    const { posts } = usePosts();
    const { tags } = useTags();

    const filteredPosts = useMemo<Post[]>(() => {
        return selectedTag == 'all'
            ? posts
            : posts.filter(post =>
                post.tags.includes(selectedTag)
            );
    }, [posts, selectedTag]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (page - 1) * CONFIG.PAGE_SIZE;
        return filteredPosts.slice(startIndex, startIndex + CONFIG.PAGE_SIZE);
    }, [filteredPosts, page]);


    return (
        <section className="d-flex flex-column w-100">

            <div className="container d-flex flex-wrap p-3">
                {tags.map((tag, tagIndex) => (
                    <Chip key={tagIndex} label={tag.title} clickable
                        color={selectedTag == tag.title ? 'primary' : 'default'}
                        className="me-2"
                        onClick={() => setSelectedTag(tag.title)} />
                ))}
            </div>

            <div className="container">
                <div className="row g-3">
                    {paginatedPosts.map((post, postIndex) => (
                        <div key={postIndex} className="col-xl-3 col-lg-4 col-md-6">
                            <PostCard post={post} onPostClick={(postId) => setShowPostDialog(postId)} />
                        </div>
                    ))}
                </div>
            </div>

            {paginatedPosts?.length > 0 && (
                <Pagination className="align-self-center my-4"
                    count={Math.ceil(filteredPosts.length / CONFIG.PAGE_SIZE)}
                    page={page}
                    onChange={(_e, value: number) => setPage(value)} />
            )}

            <PostDialog id={showPostDialog ?? 0} open={!!showPostDialog}
                onClose={() => setShowPostDialog(null)} />
        </section>
    )
}