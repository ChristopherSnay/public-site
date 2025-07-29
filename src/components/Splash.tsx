import { Box, Collapse, useScrollTrigger } from "@mui/material";
import type { ReactNode } from "react";

export default function Splash({ children }: { children: ReactNode }) {

    const trigger = useScrollTrigger({
        threshold: 100,
        disableHysteresis: true,
    })

    return (
        <Box sx={{ height: '100vh', overflow: 'hidden' }}>
            <Collapse in={!trigger} timeout={600}>
                <Box sx={{
                    height: '100vh',
                    backgroundImage: 'url(/assets/splash.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '2rem',
                }}>
                    <img src='/static/images/splash-bg.jpg' />
                </Box>
                {children}
            </Collapse>
        </Box>
    )
}