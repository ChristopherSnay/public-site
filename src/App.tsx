import { ContactMailOutlined, SchoolOutlined, WorkOutline } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar, Tooltip, Typography } from "@mui/material";
import { Outlet, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar
        elevation={0}
        position="static"
        color="transparent"
      >
        <Toolbar>
          <Link
            component={RouterLink}
            variant="h6"
            to="/"
            underline="none"
            color={location.pathname === '/' ? 'primary' : 'textDisabled'}
            className="me-auto">
            christophersnay.com
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button
              variant="text"
              color={location.pathname === '/experience' ? 'warning' : 'primary'}
              onClick={() => navigate('/experience')}>
              Experience
            </Button>
            <Button
              variant="text"
              color={location.pathname === '/education' ? 'warning' : 'primary'}
              onClick={() => navigate('/education')}>
              Education
            </Button>
            <Button
              variant="outlined"
              color={location.pathname === '/contact' ? 'warning' : 'primary'}
              onClick={() => navigate('/contact')}>
              Contact
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1 }}>
            <Tooltip title="Experience">
              <IconButton
                color={location.pathname === '/experience' ? 'warning' : 'primary'}
                onClick={() => navigate('/experience')} >
                <WorkOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Education">
              <IconButton
                color={location.pathname === '/education' ? 'warning' : 'primary'}
                onClick={() => navigate('/education')} >
                <SchoolOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Contact">
              <IconButton
                color={location.pathname === '/contact' ? 'warning' : 'primary'}
                onClick={() => navigate('/contact')}>
                <ContactMailOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <main className="d-flex flex-column w-100">
        <Outlet />
      </main>

      <Box
        component="footer"
        className="d-flex w-100 mt-auto p-5">
        <Container
          maxWidth="sm"
          className="text-center">
          <Typography
            color="textSecondary"
            variant="body2">
            {`Copyright © Christopher Snay ${new Date().getFullYear()}`}
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default App
