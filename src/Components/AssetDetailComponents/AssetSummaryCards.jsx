import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { brandPalette, statCardPalette } from "../../constants/uiPalette";

const cardShell = {
  borderRadius: 3,
  border: `1px solid ${brandPalette.border}`,
  boxShadow: "var(--smaint-shadow, 0px 10px 28px rgba(15,100,102,0.08))",
};

const AssetSummaryCards = ({ detail }) => {
  const openMaintenancePlans = (detail?.mpList || []).filter(
    (mp) => mp.status !== "COMPLETED"
  );

  const cards = [
    {
      title: "Open Maintenance Plans",
      accent: statCardPalette[0]?.accent || brandPalette.primary,
      surface: statCardPalette[0]?.surface || brandPalette.surface,
      content: (
        <>
          <Typography variant="h4" sx={{ color: brandPalette.primary, mb: 1 }}>
            {openMaintenancePlans.length}
          </Typography>
          <Box component="ul" sx={{ pl: 2, my: 0 }}>
            {openMaintenancePlans.slice(0, 4).map((mp) => (
              <Typography
                component="li"
                variant="body2"
                key={mp.id}
                sx={{ mb: 0.5 }}
              >
                {mp.name} –{" "}
                {mp.dueDate
                  ? new Date(mp.dueDate).toLocaleDateString()
                  : "No date"}
              </Typography>
            ))}
            {openMaintenancePlans.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                All plans are up to date.
              </Typography>
            )}
          </Box>
        </>
      ),
    },
    {
      title: "Equipment Condition",
      accent: statCardPalette[1]?.accent || brandPalette.mint,
      surface: statCardPalette[1]?.surface || brandPalette.surfaceAlt,
      content: (
        <>
          <Typography>
            <strong>Condition:</strong> {detail?.condition || "Not specified"}
          </Typography>
          <Typography>
            <strong>Cycle:</strong> {detail?.cycle || "Unknown"}
          </Typography>
          <Typography>
            <strong>Runtime:</strong>{" "}
            {detail?.runtimeHours ? `${detail.runtimeHours} hrs` : "N/A"}
          </Typography>
        </>
      ),
    },
    {
      title: "Current Values",
      accent: statCardPalette[2]?.accent || brandPalette.teal,
      surface: statCardPalette[2]?.surface || brandPalette.surfaceMuted,
      content: (
        <>
          {["currentValue", "squenceValue", "resetValue"].map((key) => (
            <Typography key={key}>
              <strong>{key}:</strong> {detail?.[key] ?? "-"}
            </Typography>
          ))}
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.title}>
          <Card
            sx={{
              ...cardShell,
              backgroundColor: card.surface,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ color: card.accent, mb: 1 }}
              >
                {card.title}
              </Typography>
              {card.content}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AssetSummaryCards;
