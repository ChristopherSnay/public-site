import { Chip } from "@mui/material";
import { useMemo, useState } from "react";
import usePosts from "../hooks/usePosts";
import useTags from "../hooks/useTags";
import type { Post } from "../models/Post";
import PostCard from "./PostCard";
import PostDialog from "./PostDialog";

export default function PostGrid() {
    const [selectedTag, setSelectedTag] = useState<string>('updates');
    const [showPostDialog, setShowPostDialog] = useState<number | null>(null);
    const { posts } = usePosts();
    const { tags } = useTags();

    const filteredPosts = useMemo<Post[]>(() => {
        return posts.filter(post =>
            post.tags.includes(selectedTag)
        );
    }, [posts, selectedTag]);

    return (
        <section className="w-100">

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
                    {filteredPosts.map((post, postIndex) => (
                        <div key={postIndex} className="col-xl-3 col-lg-4 col-md-6">
                            <PostCard post={post} onPostClick={(postId) => setShowPostDialog(postId)} />
                        </div>
                    ))}
                </div>
            </div>

            <PostDialog id={showPostDialog ?? 0} open={!!showPostDialog}
                onClose={() => setShowPostDialog(null)} />
        </section>
    )
}