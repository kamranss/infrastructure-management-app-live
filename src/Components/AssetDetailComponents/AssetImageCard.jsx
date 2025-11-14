import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const AssetImageCard = ({ imageUrl }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6" gutterBottom></Typography>
    {imageUrl ? (
      <Box
        component="img"
        src={imageUrl}
        alt="Equipment"
        sx={{
          width: "100%",
          maxHeight: 200,
          borderRadius: 2,
          objectFit: "cover",
        }}
      />
    ) : (
      <Typography>No image available</Typography>
    )}
  </Paper>
);

export default AssetImageCard; // ✅ Add this line
