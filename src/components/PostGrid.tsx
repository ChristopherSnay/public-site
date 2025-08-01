import { FirstPage, NavigateNext } from '@mui/icons-material';
import { Chip, IconButton, Pagination, Tooltip } from "@mui/material";
import { useMemo, useState, type ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CONFIG } from "../constants/config";
import usePosts from "../hooks/usePosts";
import useTags from "../hooks/useTags";
import type { Post } from "../models/Post";
import PostCard from "./PostCard";
import PostDialog from "./PostDialog";

export default function PostGrid() {
    const [showPostDialog, setShowPostDialog] = useState<number | null>(null);
    const [showMoreTags, setShowMoreTags] = useState<boolean>(false);
    const [showAllTags, setShowAllTags] = useState<boolean>(false);
    const { posts } = usePosts();
    const { tags } = useTags();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get('page')) > 0
        ? Number(searchParams.get('page'))
        : 1;
    const tag = searchParams.get('tag') || 'all';

    const setPage = (value: number) => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: value.toString() });
    };

    const setTag = (tag: string) => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), tag: tag, page: '1' });
    };

    const handlePostClick = (postId: number) => {
        navigate(`/post/${postId}`);
    }

    const handleMoreTagsClick = () => {
        if (!showMoreTags) {
            setShowMoreTags(true);
        } else if (!showAllTags) {
            setShowAllTags(true);
        } else {
            setShowMoreTags(false);
            setShowAllTags(false);
        }
    }

    const filteredTags = useMemo<string[]>(() => {
        if (showAllTags) {
            return tags;
        } else if (showMoreTags) {
            return tags.slice(0, 10);
        } else {
            return tags.slice(0, 5);
        }

    }, [tags, showMoreTags, showAllTags]);

    const tagIcon = useMemo<ReactElement>(() => {
        if (showAllTags) {
            return <FirstPage />
        } else if (showMoreTags) {
            return <NavigateNext />
        } else {
            return <NavigateNext />
        }
    }, [filteredTags]);

    const filteredPosts = useMemo<Post[]>(() => {
        return tag == 'all'
            ? posts
            : posts.filter(post =>
                post.tags.includes(tag)
            );
    }, [posts, tag]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (page - 1) * CONFIG.PAGE_SIZE;
        return filteredPosts.slice(startIndex, startIndex + CONFIG.PAGE_SIZE);
    }, [filteredPosts, page]);

    return (
        <section className="d-flex flex-column w-100">
            <div className="container d-flex flex-wrap p-3 gap-2">
                {filteredTags.map((t, tagIndex) => (
                    <Chip key={tagIndex} label={t} clickable
                        color={t == tag ? 'primary' : 'default'}
                        onClick={() => setTag(t)} />
                ))}
                <Tooltip title={showAllTags ? 'less' : 'more'}>
                    <IconButton size="small" onClick={handleMoreTagsClick}>
                        {tagIcon}
                    </IconButton>
                </Tooltip>
            </div>

            <div className="container">
                <div className="row g-3">
                    {paginatedPosts.map((post, postIndex) => (
                        <div key={postIndex} className="col-xl-4 col-md-6">
                            <PostCard post={post} onPostClick={handlePostClick} />
                        </div>
                    ))}
                </div>
            </div>

            <Pagination className="align-self-center my-4"
                count={Math.ceil(filteredPosts.length / CONFIG.PAGE_SIZE)}
                page={page}
                onChange={(_e, value: number) => setPage(value)} />

            <PostDialog id={showPostDialog ?? 0} open={!!showPostDialog}
                onClose={() => setShowPostDialog(null)} />
        </section>
    )
}