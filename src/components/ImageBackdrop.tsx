import { Box } from "@mui/material";
import { useMemo } from "react";
import useImageFilters from "../hooks/useImageFilters";
import useImages from "../hooks/useImages";

export default function ImageBackdrop(props: Readonly<ImageBackdropProps>) {
    const { getRandomHue } = useImageFilters();
    const { localImage } = useImages();
    const hueRotate = `hue-rotate(${getRandomHue(props.id, props.title)})`;

    const hasImage = useMemo<boolean>(() => {
        return !!props?.src && props.src.length > 0;
    }, [props?.src]);

    const filter = hasImage ? 'blur(20px)' : `blur(20px) ${hueRotate}`;

    return (
        <Box
            sx={{
                position: 'relative',
                height: '200px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${localImage(props.src)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.1)',
                    zIndex: 0,
                    filter
                }}
            />

            <Box
                component="img"
                src={localImage(props.src)}
                sx={{
                    height: '100%',
                    maxWidth: '1000px',
                    width: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    zIndex: 1,
                    ...(hasImage ? {} : { filter: hueRotate })
                }}
            />
        </Box>
    );
};

export interface ImageBackdropProps {
    src?: string;
    id: string | number;
    title: string;
}