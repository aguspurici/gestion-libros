import React from "react"
import { Box, Container, Typography, Button } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";


const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
       
        minHeight: "100vh",
        
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",     
        textAlign: "center",
      }}

    >
      <Container maxWidth="md">
        <AutoStoriesIcon
          sx={{
            fontSize: 64,
            color: "primary.main",
            mb: 3,
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          MyBooks
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 5,
            fontWeight: 400,
          }}
        >
          Gestiona y organiza tu colección personal de libros en un solo lugar.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              width: "180px",
              "&:hover": {
                color: "white",
              }
            }}
          >
            Iniciar sesion
          </Button>

          <Button
            component={Link}
            to="/register"
            variant="outlined"
            size="large"
            sx={{ px: 4, width: "180px" }}
          >
            Registrarse
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage