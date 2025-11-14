import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Chip,
  Alert,
} from "@mui/material";

const palette = {
  primary: "#0f6466",
  accent: "#3aafa9",
  light: "#f4f7fb",
  navy: "#17252a",
};

const demoUsers = [
  {
    name: "Maintenance Admin",
    username: "demo.admin@smaint.local",
    password: "maintDemo!",
    role: "Administrator",
  },
  {
    name: "Field Technician",
    username: "tech.user@smaint.local",
    password: "techDemo!",
    role: "Technician",
  },
];

const OfflineLogin = () => {
  const navigate = useNavigate();
  const defaultUser = useMemo(() => demoUsers[0], []);
  const [formData, setFormData] = useState({
    username: defaultUser.username,
    password: defaultUser.password,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleQuickFill = (user) => {
    setFormData({ username: user.username, password: user.password });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const match = demoUsers.find(
      (user) =>
        user.username === formData.username && user.password === formData.password
    );

    if (!match) {
      setError("Credentials do not match a demo user.");
      return;
    }

    localStorage.setItem("token", "offline-demo-token");
    localStorage.setItem(
      "offlineProfile",
      JSON.stringify({ name: match.name, username: match.username })
    );
    navigate("/dashboard");
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
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" color={palette.navy} fontWeight={600}>
              Offline Demo Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No backend? No problem. Use one of the temporary accounts below to
              explore the app with static data.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {demoUsers.map((user) => (
                <Chip
                  key={user.username}
                  label={`${user.name} (${user.role})`}
                  onClick={() => handleQuickFill(user)}
                  sx={{
                    backgroundColor:
                      formData.username === user.username
                        ? palette.accent
                        : "rgba(15,100,102,0.08)",
                    color:
                      formData.username === user.username ? "#fff" : palette.navy,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                />

                {error && (
                  <Alert severity="error" onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: palette.primary,
                    textTransform: "none",
                    ":hover": { backgroundColor: palette.navy },
                  }}
                >
                  Enter Demo Workspace
                </Button>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} justifyContent="center">
              <Typography variant="body2" color="text.secondary">
                Ready for the live API?
              </Typography>
              <NavLink to="/login" style={{ color: palette.primary }}>
                Go back to secure login
              </NavLink>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default OfflineLogin;
