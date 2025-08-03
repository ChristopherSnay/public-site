import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorAvatar from "../components/AuthorAvatar";
import PostBlock from "../components/PostBlock";
import { useDates } from "../hooks/useDates";
import useImageFilters from "../hooks/useImageFilters";
import useImages from "../hooks/useImages";
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const { postId } = useParams();
    const { localImage } = useImages();
    const { toLocalDate } = useDates();
    const { getById } = usePosts();
    const { getRandomHue } = useImageFilters();

    const hasImage = useMemo<boolean>(() => {
        return !!post?.image && post.image.length > 0;
    }, [post?.image]);

    useEffect(() => {
        const postIdNum = Number(postId);

        getById(postIdNum).then(result => {
            if (result) {
                setPost(result);
            }
        });

    }, [postId]);

    return (
        <>
            {post && (
                <>
                    <Box component="img"
                        src={localImage(post.image)}
                        sx={{
                            borderRadius: 1,
                            display: 'block',
                            width: '100%',
                            maxHeight: 200,
                            objectFit: 'cover',
                            margin: 'auto'
                        }}
                        style={hasImage ? {} : { filter: `hue-rotate(${getRandomHue(post.id, post.title)})` }} />

                    <div className="container">
                        <div className="row justify-content-center">
                            <Paper elevation={0} className="col-md-8 px-4">
                                <div className="my-3">
                                    <AuthorAvatar date={toLocalDate(post.date)} />
                                </div>

                                <hr className="m-0" />

                                <header className="pt-4 pb-5">
                                    <Typography variant="h4" >
                                        {post.title}
                                    </Typography>
                                    <Typography variant="overline">
                                        {post.tags.join(', ').toUpperCase()}
                                    </Typography>
                                </header>

                                {post.blocks?.map((block, blockIndex) => (
                                    <PostBlock key={blockIndex} index={blockIndex} block={block} />
                                ))}
                            </Paper>

                        </div>
                    </div>

                </>
            )}

        </>
    )
}