import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostBlock from "../components/PostBlock";
import { useDates } from "../hooks/useDates";
import useImageLinks from "../hooks/useImageLinks";
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const { postId } = useParams();
    const { localImage } = useImageLinks();
    const { toLocalDate } = useDates();
    const { getById } = usePosts();

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
                    {post.image && (
                        <Box component="img"
                            src={localImage(post.image)}
                            sx={{
                                borderRadius: 1,
                                display: 'block',
                                width: '100%',
                                maxHeight: 200,
                                objectFit: 'cover',
                                margin: 'auto'
                            }} />
                    )}
                    <div className="container">
                        <div className="row justify-content-center">
                            <Paper elevation={0} className="col-md-8 px-4">
                                <div className="d-flex align-items-center py-3">
                                    <Avatar variant="square">CS</Avatar>
                                    <div className="d-flex flex-column ms-2">
                                        <Typography variant="body1">Christopher Snay</Typography>
                                        <Typography color="textSecondary" variant="caption">{toLocalDate(post.date)}</Typography>
                                    </div>
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