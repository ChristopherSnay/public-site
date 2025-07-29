import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import useImageLinks from "../hooks/useImageLinks";
import type { Post } from "../models/Post";

export default function PostCard(props: Readonly<PostCardProps>) {
    const { localImage } = useImageLinks();


    return (
        <Card elevation={5}>
            <CardActionArea onClick={() => props.onPostClick(props.post.id)}>
                <CardMedia
                    component="img"
                    height="194"
                    image={localImage(`static/images/${props.post.image}`)}
                    alt="Paella dish"
                />

                <CardContent>
                    <Typography variant="overline">{props.post.tags.join(', ').toUpperCase()}</Typography>
                    <Typography variant="h5">{props.post.title}</Typography>
                    <Typography variant="body2" sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {props.post.paragraphs?.[0]}
                    </Typography>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex align-items-center" onClick={(e) => { e.preventDefault(); console.debug('ok') }}>
                            <Avatar variant="square">CS</Avatar>
                            <span className="ms-2">Christopher Snay</span>
                        </div>
                        <Typography variant="caption" className="align-items-end">
                            {new Date(props.post.date).toLocaleDateString()}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

interface PostCardProps {
    post: Post;
    onPostClick: (postId: number) => void;
}