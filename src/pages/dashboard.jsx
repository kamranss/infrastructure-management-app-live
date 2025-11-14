import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { statCardPalette, brandPalette } from "../constants/uiPalette";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {

  useEffect(() => {
    // Logic for fetching data or initializing the chart (if needed)
  }, []);

  // Bar chart data
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Stats",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(15, 100, 102, 0.15)",
        borderColor: brandPalette.primary,
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["New Users", "Subscribed Users", "Inactive Users"],
    datasets: [
      {
        data: [500, 300, 200],
        backgroundColor: [
          brandPalette.primary,
          brandPalette.accent,
          brandPalette.success,
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const overviewCards = [
    {
      title: "Ongoing Maintenance",
      details: [
        "Arrived (port entry): 12.09.2025, 22:48",
        "Arrived (on yard): 12.09.2025, 22:48",
      ],
    },
    {
      title: "Asset Statuses",
      details: [
        "Departed (from yard): 12.09.2025, 22:48",
        "Departed (port exit): 12.09.2025, 22:48",
      ],
    },
    {
      title: "Inventory",
      details: [
        "Storage dwell time: 5 days, 54 min",
        "Total dwell time: 5 days, 54 min",
      ],
    },
    {
      title: "Usage History",
      details: [
        "Planned Area: Area",
        "Planned Location: Location",
        "Planned Position: Position",
      ],
    },
  ].map((card, index) => ({
    ...card,
    ...statCardPalette[index % statCardPalette.length],
  }));

  const locationCardPalette = statCardPalette[1];
  const cardShellStyle = {
    borderRadius: 3,
    border: "1px solid var(--smaint-border)",
    boxShadow: "var(--smaint-shadow)",
    backgroundColor: "#ffffff",
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Welcome to the Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: "2rem" }}>
        {overviewCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{ ...cardShellStyle, backgroundColor: card.surface }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: card.accent }}>
                  {card.title}
                </Typography>
                {card.details.map((detail, idx) => (
                  <Typography variant="body2" key={idx}>
                    {detail}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid container spacing={3}>
          {/* Bar Chart Card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={cardShellStyle}>
              <CardContent>
                <Typography variant="h6">Sales Overview</Typography>
                <div
                  style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    height: "300px",
                  }}
                >
                  <Bar data={barData} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart Card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={cardShellStyle}>
              <CardContent>
                <Typography variant="h6">User Distribution</Typography>
                <div
                  style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    height: "300px",
                  }}
                >
                  <Pie data={pieData} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Other Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardShellStyle}>
            <CardContent>
              <Typography variant="h6">Other Information</Typography>
              <Typography variant="h4">Data</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Current Location Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              ...cardShellStyle,
              backgroundColor: locationCardPalette.surface,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: locationCardPalette.accent }}
              >
                Current Location
              </Typography>
              <Typography variant="body1">Location details: Area</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
