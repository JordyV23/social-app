import { Typography,useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AppLogo = () => {
  const navigate = useNavigate();

  const theme = useTheme();


  const primaryLight = theme.palette.primary.light;
  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem,2rem,2.5rem)"
      color="primary"
      onClick={() => navigate("/home")}
      sx={{
        "&:hover": {
          color: primaryLight,
          cursor: "pointer",
        },
      }}
    >
      The Social App
    </Typography>
  );
};
