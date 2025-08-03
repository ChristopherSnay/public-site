import { Box, Paper, Typography } from "@mui/material";
import useImages from "../hooks/useImages";
import type { PostBlock } from "../models/PostBlock";

export default function PostBlock(props: Readonly<PostBlockProps>) {
    const { localImage } = useImages();
    switch (props.block.blockType) {
        case 1: // Paragraph
            return <p>{props.block.content}</p>
        case 2: // Image
            return <Box
                component="img"
                src={localImage(props.block.content)}
                className="py-4"
                sx={{
                    borderRadius: 2,
                    display: 'block',
                    width: '100%',
                    maxWidth: {
                        xs: '100%',
                        sm: '100%',
                        md: 600,
                        lg: 500
                    },
                    margin: 'auto',
                    boxShadow: 'inherit'
                }} />;
        case 3: // Code 
            return <div className="py-4">
                <Paper component="div" elevation={0} className="p-2 border rounded border-1 border-info" >
                    <Typography component="pre" color="primary" sx={{
                        fontFamily: 'monospace',
                    }}>{props.block.content}</Typography>
                </Paper>
            </div>
        case 4: // Link
            return <a href={`https://${props.block.content}`} target="_blank">
                {props.block.content}
            </a>

        default:
            return (
                <></>
            )
    }
}

interface PostBlockProps {
    index: number;
    block: PostBlock;
}