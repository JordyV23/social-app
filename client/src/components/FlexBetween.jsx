import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Permite reutilizar esas propiedades de CSS
export const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})
