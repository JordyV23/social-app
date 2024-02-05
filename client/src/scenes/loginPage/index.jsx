import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { AppLogo } from "../../components";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const background = theme.palette.background.alt;

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={background}
        p="1rem 6%"
        textAlign="center"
      >
        <AppLogo />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={background}
      >
        <Typography fontWeight="500" variant="h5" sx={{ m: "1.5rem" }}>
          Welcome to the Social App!
        </Typography>

        <LoginForm />
      </Box>
    </Box>
  );
};
