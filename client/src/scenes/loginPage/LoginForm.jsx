import { useState } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import {
  initialRegisterForm,
  initialValuesLogin,
  loginSchema,
  registerSchema,
} from "../../validations";
import { RegisterFields } from "./RegisterFields";
import { LoginFields } from "./LoginFields";
import { useAuthActions } from "../../hooks/useAuthActions";

export const LoginForm = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const { main, light } = palette.primary;
  const { register, login } = useAuthActions();

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialRegisterForm}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <RegisterFields
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </>
            )}

            <LoginFields
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              values={values}
              setFieldValue={setFieldValue}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: main,
                color: palette.background.alt,
                "&:hover": { color: main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: main,
                "&:hover": {
                  cursor: "pointer",
                  color: light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Register!"
                : "Already have an account? Login!"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
