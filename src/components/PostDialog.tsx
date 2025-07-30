import { ArrowBack } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useDates } from '../hooks/useDates';
import useImageLinks from '../hooks/useImageLinks';
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";
import PostBlock from './PostBlock';

export default function PostDialog(props: Readonly<PostDialogProps>) {
    const { posts } = usePosts();
    const { localImage } = useImageLinks();
    const { toLocalDate } = useDates();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    const post = useMemo<Post | undefined>(() => {
        return posts.find(x => x.id == props.id);
    }, [props.id]);

    return (
        <Dialog open={!!props.open} fullWidth fullScreen={isMobile} maxWidth="lg" onClose={props.onClose}>
            {post && (
                <>
                    <DialogTitle className="d-flex align-items-center p-2 ps-3">
                        <IconButton color="warning" onClick={props.onClose}>
                            <ArrowBack />
                        </IconButton>
                        <span className="w-100 ms-2">{`Posted ${toLocalDate(post.date)}`}</span>
                        <IconButton color="warning" onClick={props.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent className="p-0">
                        <Paper square className="px-3 py-5">
                            <div className="container">
                                <Box component="img"
                                    src={localImage(post.image)}
                                    sx={{
                                        borderRadius: 1,
                                        display: 'block',
                                        width: '100%',
                                        maxWidth: {
                                            xs: '100%',
                                            sm: '100%',
                                            md: 600,
                                            lg: 500
                                        },
                                        margin: 'auto'
                                    }} />

                                <div className="d-flex align-items-center py-3" onClick={(e) => { e.preventDefault(); console.debug('ok') }}>
                                    <Avatar variant="square">CS</Avatar>
                                    <div className="d-flex flex-column ms-2">
                                        <Typography variant="body1">Christopher Snay</Typography>
                                        <Typography color="textSecondary" variant="caption">{toLocalDate(post.date)}</Typography>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <Typography variant="h4" className="py-3">
                                    {post.title}
                                </Typography>

                                {post.blocks?.map((block, blockIndex) => (
                                    <PostBlock key={blockIndex} block={block} />

                                ))}
                            </div>
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