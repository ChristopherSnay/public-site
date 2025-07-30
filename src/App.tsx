import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ContactDialog from "./components/ContactDialog";

function App() {
  const [showContactDialog, setShowContactDialog] = useState<boolean>(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div" className="flex-grow-1">
            christophersnay.com
          </Typography>
          <Button variant="outlined" onClick={() => setShowContactDialog(true)}>Contact</Button>
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
