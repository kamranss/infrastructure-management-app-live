import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import FormRegister from "../Components/Forms/FormRegister";
import { NavLink } from "react-router-dom";
import { register as registerUser } from "../api/services/authService";

const palette = {
  primary: "#0f6466",
  accent: "#3aafa9",
  light: "#f4f7fb",
  navy: "#17252a",
};

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmedPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: [] }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setServerError("");
    setSuccessMessage("");
    setSubmitting(true);

    const response = await registerUser(formData);

    if (response?.errors) {
      setValidationErrors(response.errors);
      setSubmitting(false);
      return;
    }

    if (!response || Object.keys(response).length === 0) {
      setServerError("Registration failed. Please try again.");
      setSubmitting(false);
      return;
    }

    setSuccessMessage("Account created! Please verify your email.");
    localStorage.setItem("userEmail", formData.Email);
    localStorage.setItem("userOTP", "");
    window.location.href = "/verifyEmail";
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${palette.light}, #e1f5f2)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={8} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                backgroundColor: palette.primary,
                color: "#fff",
                p: { xs: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                Create an account
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Register to sync with the live maintenance platform. When the API is
                offline you can still explore the UI using the offline login.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                component={NavLink}
                to="/login/offline"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  ":hover": { borderColor: palette.accent, color: palette.accent },
                }}
              >
                Prefer offline mode?
              </Button>
            </Grid>

            <Grid item xs={12} md={7} sx={{ p: { xs: 4, md: 5 } }}>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={600} color={palette.navy}>
                  Join Smaint
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We’ll send an email to verify your identity.
                </Typography>

                {serverError && (
                  <Alert severity="error" onClose={() => setServerError("")}>
                    {serverError}
                  </Alert>
                )}
                {successMessage && (
                  <Alert severity="success" onClose={() => setSuccessMessage("")}>
                    {successMessage}
                  </Alert>
                )}

                <FormRegister
                  formData={formData}
                  validationErrors={validationErrors}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                />

                <Stack direction="row" spacing={1} justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?
                  </Typography>
                  <NavLink to="/login" style={{ color: palette.primary }}>
                    Return to login
                  </NavLink>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
