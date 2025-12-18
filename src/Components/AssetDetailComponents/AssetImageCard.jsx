import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { brandPalette } from "../../constants/uiPalette";

const AssetImageCard = ({
  imageUrl,
  title = "Visual Snapshot",
  hideImage = false,
  children,
}) => (
  <Card
    sx={{
      borderRadius: 3,
      border: `1px solid ${brandPalette.border}`,
      backgroundColor: brandPalette.surface,
      boxShadow: "var(--smaint-shadow, 0px 12px 24px rgba(15,100,102,0.08))",
      height: "100%",
    }}
  >
    <CardContent>
      <Typography
        variant="subtitle2"
        sx={{ color: brandPalette.primary, mb: hideImage ? 2 : 1 }}
      >
        {title}
      </Typography>
      {!hideImage && imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt="Equipment"
          sx={{
            width: "100%",
            maxHeight: 220,
            borderRadius: 2,
            objectFit: "cover",
            border: `1px solid ${brandPalette.border}`,
            mb: children ? 2 : 0,
          }}
        />
      )}
      {!hideImage && !imageUrl && (
        <Typography color="text.secondary" mb={children ? 2 : 0}>
          No image available
        </Typography>
      )}
      {children}
    </CardContent>
  </Card>
);

export default AssetImageCard;
