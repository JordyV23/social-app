import { useTheme } from "@emotion/react";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../../components";
import EditedOutlinedIcon from "@mui/icons-material/EditOutlined";

export const RegisterFields = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const { palette } = useTheme();

  return (
    <>
      <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
        helperText={touched.lastName && errors.lastName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        name="location"
        error={Boolean(touched.location) && Boolean(errors.location)}
        helperText={touched.location && errors.location}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        label="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation}
        name="occupation"
        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
        helperText={touched.occupation && errors.occupation}
        sx={{ gridColumn: "span 4" }}
      />

      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p>Try Adding a picture here! :D</p>
              ) : (
                <FlexBetween>
                  <Typography>{values.picture.name}</Typography>
                  <EditedOutlinedIcon />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
      </Box>
    </>
  );
};
