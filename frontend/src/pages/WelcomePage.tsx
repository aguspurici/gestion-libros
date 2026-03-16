import { Box, Typography, Button, Container } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const WelcomePage = () => {

    const { user } = useAuth();
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
                    variant="h5"
                    sx={{
                        color: "text.secondary",
                        mb: 4,
                        fontWeight: 400,
                        textTransform: "capitalize"
                    }}
                >
                    Bienvenido {user?.nombre}
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
                        to="/mis-libros"
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
                        Ver Libros
                    </Button>


                </Box>
            </Container>
        </Box>
    );
};

export default WelcomePage;



