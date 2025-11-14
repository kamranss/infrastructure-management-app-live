import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

const palette = {
  primary: "#0f6466",
  accent: "#3aafa9",
  navy: "#17252a",
  light: "#f4f7fb",
};

const Login = () => {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7066";
  const LOGIN_ENDPOINT = `${API_BASE}/api/Account/login`;

  const [formData, setFormData] = useState({
    UserNameOrEmail: "",
    Password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    setAuthError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError("");
    try {
      const response = await axios.post(LOGIN_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = response.data || {};
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        navigate("/dashboard");
        return;
      }

      setAuthError("Unable to sign in. Please try again.");
    } catch (error) {
      if (error.response?.status === 400) {
        setValidationErrors(error.response?.data || {});
      } else {
        setAuthError(
          "We couldn’t reach the API. Start the backend or try the offline demo."
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
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
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
                Live API Login
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                This path authenticates against your real backend. If the API is
                offline, use the “Offline Demo” mode to explore the UI with mock
                data.
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
                Try Offline Demo
              </Button>
            </Grid>

            <Grid item xs={12} md={7} sx={{ p: { xs: 4, md: 5 } }}>
              <Typography variant="h4" fontWeight={600} color={palette.navy}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Sign in with your maintenance credentials.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Username or Email"
                    name="UserNameOrEmail"
                    value={formData.UserNameOrEmail}
                    onChange={handleChange}
                    error={Boolean(validationErrors.UserNameOrEmail)}
                    helperText={validationErrors.UserNameOrEmail}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    name="Password"
                    type="password"
                    value={formData.Password}
                    onChange={handleChange}
                    error={Boolean(validationErrors.Password)}
                    helperText={validationErrors.Password}
                  />

                  {authError && (
                    <Alert severity="error" onClose={() => setAuthError("")}>
                      {authError}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{
                      textTransform: "none",
                      backgroundColor: palette.primary,
                      ":hover": { backgroundColor: palette.navy },
                    }}
                  >
                    {submitting ? "Signing in..." : "Sign in"}
                  </Button>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="text.secondary">
                      Need an account?
                    </Typography>
                    <NavLink to="/register" style={{ color: palette.primary }}>
                      Register here
                    </NavLink>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
