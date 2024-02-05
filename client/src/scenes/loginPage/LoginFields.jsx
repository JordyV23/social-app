import { TextField } from "@mui/material";
import React from "react";

export const LoginFields = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  return (
    <>
      <TextField
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Password"
        type="password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        name="password"
        error={Boolean(touched.password) && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: "span 2" }}
      />
    </>
  );
};
