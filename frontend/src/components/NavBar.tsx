import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AutoStoriesIcon from '@mui/icons-material/AutoStories';


import Container from "@mui/material/Container";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/");
  };

  return (
    <AppBar >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ fontSize: 40,px: 2 , color: "white", mb: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyBooks
          </Typography>

          {!isAuthenticated ? (
            <Button color="inherit" sx={{
              color: "white",
              "&:hover": {
                color: "white"
              }
            }} component={Link} to="/login">
              Iniciar Sesión
            </Button>
          ) : (
            <>
              <Button color="inherit" sx={{
              color: "white",
              "&:hover": {
                color: "white"
              }
            }} component={Link} to="/mis-libros">
                Mis Libros
              </Button>

              <Button color="inherit" sx={{
              color: "white",
              "&:hover": {
                color: "white"
              }
            }} onClick={handleLogout}>
                Desconectar
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;