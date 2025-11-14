// RegistrationForm.js
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup"; // Import FormGroup
import FormControl from "@mui/material/FormControl"; // Import FormControl

const FormRegister = ({
  formData,
  validationErrors,
  onChange,
  onSubmit,
  submitting = false,
}) => {
  const inputMarginStyle = {
    marginBottom: "15px",
  };
  return (
    <form onSubmit={onSubmit}>
      <FormGroup className="form_fields_register">
        {" "}
        {/* Use FormGroup */}
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="Name"
            name="Name"
            value={formData.Name}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
          {validationErrors.Name && validationErrors.Name.length > 0 ? (
            <span className="validation-error">{validationErrors.Name[0]}</span>
          ) : null}
        </FormControl>
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="Surname"
            name="Surname"
            value={formData.Surname}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
          {validationErrors.Surname && validationErrors.Surname.length > 0 ? (
            <span className="validation-error">
              {validationErrors.Surname[0]}
            </span>
          ) : null}
        </FormControl>
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="Username"
            name="UserName"
            // value={formData.UserName}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
          {validationErrors.Email && validationErrors.Email.length > 0 ? (
            <span className="validation-error">
              {validationErrors.Email[0]}
            </span>
          ) : null}
        </FormControl>
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="Password"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
          {validationErrors.Password && validationErrors.Password.length > 0 ? (
            <span className="validation-error">
              {validationErrors.Password[0]}
            </span>
          ) : null}
        </FormControl>
        <FormControl fullWidth variant="outlined" style={inputMarginStyle}>
          <TextField
            label="ConfirmedPassword"
            name="ConfirmedPassword"
            type="password"
            value={formData.ConfirmedPassword}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "#0f6466" },
            }}
          />
          {validationErrors.ConfirmedPassword &&
          validationErrors.ConfirmedPassword.length > 0 ? (
            <span className="validation-error">
              {validationErrors.ConfirmedPassword[0]}
            </span>
          ) : null}
        </FormControl>
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={submitting}
      >
        {submitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};

export default FormRegister;
