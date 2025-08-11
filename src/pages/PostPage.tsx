import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorAvatar from "../components/AuthorAvatar";
import ImageBackdrop from "../components/ImageBackdrop";
import PostBlock from "../components/PostBlock";
import { useDates } from "../hooks/useDates";
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const { postId } = useParams();
    const { localDate } = useDates();
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
                    <ImageBackdrop src={post.image} id={post.id} title={post.title} />

                    <div className="container">
                        <div className="row justify-content-center">
                            <Paper elevation={0} className="col-md-8 px-4">
                                <div className="my-3">
                                    <AuthorAvatar date={localDate(post.date)} />
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