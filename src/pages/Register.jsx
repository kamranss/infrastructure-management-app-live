import React, { useState } from "react";
import axios from "axios";
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

const palette = {
  primary: "#0f6466",
  accent: "#3aafa9",
  light: "#f4f7fb",
  navy: "#17252a",
};

const Register = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7066";
  const REGISTER_ENDPOINT = `${API_BASE}/api/Account/register`;

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

    try {
      const response = await axios.post(REGISTER_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Account created! Please verify your email.");
        localStorage.setItem("userEmail", formData.Email);
        localStorage.setItem("userOTP", "");
        window.location.href = "/verifyEmail";
        return;
      }

      setServerError("Registration failed. Please try again.");
    } catch (error) {
      if (error.response?.status === 400) {
        setValidationErrors(error.response?.data?.errors || {});
      } else {
        setServerError(
          "We couldn’t reach the API. Start the backend or try again later."
        );
      }
    } finally {
      setSubmitting(false);
    }
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
                Register to sync with the live maintenance platform. When the API
                is offline you can still explore the UI using the offline login.
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
