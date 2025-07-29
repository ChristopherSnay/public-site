import { ArrowBack } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";

export default function PostDialog(props: Readonly<PostDialogProps>) {
    const { posts } = usePosts();

    const post = useMemo<Post | undefined>(() => {
        return posts.find(x => x.id == props.id);
    }, [props.id]);

    return (
        <Dialog open={!!props.open} fullScreen onClose={props.onClose}>
            {post && (
                <>
                    <DialogTitle className="d-flex align-items-center p-2 ps-3">
                        <IconButton color="warning" onClick={props.onClose}>
                            <ArrowBack />
                        </IconButton>
                        <span className="w-100 ms-2">{`Posted ${new Date(post.date).toLocaleDateString()}`}</span>
                        <IconButton color="warning" onClick={props.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent className="p-0">
                        <Paper square className="p-3">

                            <img src={`/static/images/${post.image}`}
                                className="w-100 h-50 object-fit-cover" />
                            <Typography variant="h4" className="py-3">
                                {post.title}
                            </Typography>

                            {post.paragraphs?.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                        </Paper>
                    </DialogContent>
                </>
            )}
        </Dialog>
    )
}

export interface PostDialogProps {
    id: number;
    open?: boolean;
    onClose: () => void;
}