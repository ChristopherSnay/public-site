import { Box, Paper, Typography } from "@mui/material";
import useImageLinks from "../hooks/useImageLinks";
import type { PostBlock } from "../models/PostBlock";

export default function PostBlock(props: Readonly<PostBlockProps>) {
    const { localImage } = useImageLinks();
    switch (props.block.blockType) {
        case 1:
            return <p key={props.key}>{props.block.content}</p>
        case 2:
            return <Box key={props.key}
                component="img"
                src={localImage(props.block.content)}
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
                    margin: 'auto',
                    marginBottom: '1rem'
                }} />;
        case 3:
            return <Paper key={props.key} component="div" elevation={0} className="p-1" >
                <Typography component="pre" color="primary" sx={{
                    fontFamily: 'monospace',
                }}>{props.block.content}</Typography>
            </Paper>

        default:
            return (
                <></>
            )
    }
}

interface PostBlockProps {
    key: number;
    block: PostBlock;
}