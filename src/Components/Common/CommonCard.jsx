import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CommonCard = ({ title, color = "default", children }) => {
  return (
    <Card sx={{ backgroundColor: color, height: "100%" }}>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default CommonCard;
