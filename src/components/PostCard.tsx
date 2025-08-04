import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDates } from "../hooks/useDates";
import useImageFilters from "../hooks/useImageFilters";
import useImages from "../hooks/useImages";
import type { Post } from "../models/Post";
import AuthorAvatar from "./AuthorAvatar";

export default function PostCard(props: Readonly<PostCardProps>) {
    const { localImage } = useImages();
    const { localDate } = useDates();
    const { getRandomHue } = useImageFilters();

    const hasImage = useMemo<boolean>(() => {
        return !!props.post.image && props.post.image.length > 0;
    }, [props.post.image]);

    return (
        <Card className="border border-1 border-dark">
            <CardActionArea onClick={() => props.onPostClick(props.post.id)}>
                <CardMedia
                    component="img"
                    height="194"
                    alt={props.post.title}
                    image={localImage(props.post.image)}
                    style={hasImage ? {} : { filter: `hue-rotate(${getRandomHue(props.post.id, props.post.title)})` }} />

                <CardContent>
                    <Typography variant="overline">{props.post.tags.join(', ').toUpperCase()}</Typography>
                    <Typography variant="h5" className="mb-2 mt-0">{props.post.title}</Typography>
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
                        <AuthorAvatar date={localDate(props.post.date)} />
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