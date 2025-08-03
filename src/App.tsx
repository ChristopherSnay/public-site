import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import ContactDialog from "./components/ContactDialog";

function App() {
  const [showContactDialog, setShowContactDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Link variant="h6" component={RouterLink}
            to="/" underline="none" color="inherit" className="me-auto">
            christophersnay.com
          </Link>
          <div className="d-flex gap-1">
            <Button variant="text" onClick={() => navigate('/education')}>Education</Button>
            <Button variant="outlined" onClick={() => setShowContactDialog(true)}>Contact</Button>
          </div>
        </Toolbar>
      </AppBar>

      <main className="d-flex flex-column w-100">
        <Outlet />
      </main>

      <Box component="footer" className="d-flex w-100 mt-auto p-5">
        <Container maxWidth="sm" className="text-center">
          <Typography color="textSecondary" variant="body2">
            {`Copyright © Christopher Snay ${new Date().getFullYear()}`}
          </Typography>
        </Container>
      </Box>

      <ContactDialog open={showContactDialog} onClose={() => setShowContactDialog(false)} />
    </>
  )
}

export default App
