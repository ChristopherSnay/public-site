import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useDates } from "../hooks/useDates";
import useImageLinks from "../hooks/useImageLinks";
import type { Post } from "../models/Post";

export default function PostCard(props: Readonly<PostCardProps>) {
    const { localImage } = useImageLinks();
    const { toLocalDate } = useDates();

    return (
        <Card elevation={5}>
            <CardActionArea onClick={() => props.onPostClick(props.post.id)}>
                {props.post.image && (<CardMedia
                    component="img"
                    height="194"
                    image={localImage(props.post.image)}
                    alt="Paella dish"
                />)}

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
                        {props.post.blocks?.[0]?.content}
                    </Typography>

                    {/* Card Footer */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center" onClick={(e) => { e.preventDefault(); console.debug('ok') }}>
                            <Avatar variant="square">CS</Avatar>
                            <span className="ms-2">Christopher Snay</span>
                        </div>
                        <Typography variant="caption" className="align-items-end">
                            {toLocalDate(props.post.date)}
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