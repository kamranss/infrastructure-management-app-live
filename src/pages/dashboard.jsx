import React, { useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";
import { statCardPalette, brandPalette } from "../constants/uiPalette";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  useEffect(() => {
    // Logic for fetching data or initializing the chart (if needed)
  }, []);

  const kpiCards = [
    {
      title: "Average Utilization",
      value: "76%",
      caption: "Capacity delta +4% vs last month",
    },
    {
      title: "Assets Down",
      value: "18",
      caption: "5 critical, 13 awaiting parts",
    },
    {
      title: "Under Repair",
      value: "32",
      caption: "MTTR 11.4 hrs (goal 10.0)",
    },
    {
      title: "Under Utilized",
      value: "21",
      caption: "Reassign within 3 days",
    },
  ].map((card, index) => ({
    ...card,
    ...statCardPalette[index % statCardPalette.length],
  }));

  const utilizationTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Usage %",
        data: [65, 68, 72, 74, 70, 76, 80],
        borderColor: brandPalette.primary,
        backgroundColor: "rgba(12, 116, 117, 0.15)",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Capacity Limit %",
        data: [90, 90, 90, 90, 90, 90, 90],
        borderColor: brandPalette.accent,
        backgroundColor: "rgba(202, 98, 19, 0.12)",
        borderDash: [6, 6],
        tension: 0.1,
      },
    ],
  };

  const utilizationTrendOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: (value) => `${value}%` },
      },
    },
  };

  const maintenanceEffortData = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        label: "Corrective Hours",
        data: [120, 98, 60, 31],
        backgroundColor: "rgba(206, 96, 41, 0.35)",
        borderColor: brandPalette.primary,
        borderRadius: 6,
      },
      {
        label: "Preventive Hours",
        data: [40, 50, 70, 65],
        backgroundColor: "rgba(15, 100, 102, 0.25)",
        borderColor: brandPalette.success,
        borderRadius: 6,
      },
    ],
  };

  const maintenanceEffortOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: "Labor Hours" },
      },
    },
  };

  const assetHealthData = {
    labels: ["Operational", "Under Repair", "Awaiting Parts", "Standby"],
    datasets: [
      {
        data: [62, 18, 9, 11],
        backgroundColor: [
          brandPalette.primary,
          brandPalette.accent,
          brandPalette.success,
          "#e0e0e0",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const partsPipeline = [
    { part: "Hydraulic Pump", status: "Ordered", eta: "5 days" },
    { part: "Cooling Fan", status: "Awaiting Supplier", eta: "12 days" },
    { part: "Brake Kit", status: "Awaiting (>15d)", eta: "19 days" },
    { part: "PLC Board", status: "Received", eta: "Delivered" },
  ];

  const overdueOrders = partsPipeline.filter((item) =>
    item.status.toLowerCase().includes("15")
  );

  const satisfactionSnapshot = {
    currentScore: 4.2,
    responseRate: "67%",
    mtbf: "41 days",
    mttr: "11.4 hrs",
  };

  const alerts = [
    {
      severity: "Critical",
      message: "Generator #3 offline, backup load at 94%",
      eta: "ETA fix 3h",
    },
    {
      severity: "High",
      message: "Conveyor bearings near failure threshold",
      eta: "Inspect by EOD",
    },
    {
      severity: "Medium",
      message: "15 orders pending vendor confirmation",
      eta: "Review this week",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Typography variant="h4" mb={1}>
        Infrastructure Health Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Real-time snapshot of asset utilization, maintenance backlog, supply
        chain blockers, and satisfaction signals.
      </Typography>
      <Grid container spacing={3}>
        {kpiCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid var(--smaint-border)",
                boxShadow: "var(--smaint-shadow)",
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
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.caption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={0.5}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Utilization vs Capacity
              </Typography>
              <Line data={utilizationTrendData} options={utilizationTrendOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Asset Health Breakdown
              </Typography>
              <Pie data={assetHealthData} />
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Utilization gap vs standby assets: 14% slack remaining
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={0.5}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Maintenance Effort by Priority
              </Typography>
              <Bar data={maintenanceEffortData} options={maintenanceEffortOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Parts Pipeline
              </Typography>
              {partsPipeline.map((item) => (
                <Box
                  key={item.part}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">{item.part}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.eta}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.status}
                    color={
                      item.status.includes("15")
                        ? "error"
                        : item.status === "Received"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {overdueOrders.length} part orders exceeded 15 days. Expedite vendor
                resolution to unblock repairs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={0.5} mb={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Reliability & Satisfaction
              </Typography>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {satisfactionSnapshot.currentScore.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Overall user satisfaction (5pt scale)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(satisfactionSnapshot.currentScore / 5) * 100}
                sx={{ height: 10, borderRadius: 5, mb: 2 }}
                color="success"
              />
              <Typography variant="body2">
                Response rate: {satisfactionSnapshot.responseRate}
              </Typography>
              <Typography variant="body2">
                MTBF: {satisfactionSnapshot.mtbf}
              </Typography>
              <Typography variant="body2">MTTR: {satisfactionSnapshot.mttr}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Workload Snapshot
              </Typography>
              <Typography variant="subtitle2">Open Work Orders</Typography>
              <Typography variant="h4" mb={1}>
                143
              </Typography>
              <Typography variant="body2" color="text.secondary">
                24 preventive · 87 corrective · 32 inspections
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Inspections
              </Typography>
              <Typography variant="body2">Due this week: 18</Typography>
              <Typography variant="body2">Overdue compliance: 6</Typography>
              <Typography variant="body2">
                Oldest ticket age: 19 days (Dock crane #2)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid var(--smaint-border)",
              boxShadow: "var(--smaint-shadow)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={2}>
                Critical Issues
              </Typography>
              {alerts.map((alert) => (
                <Box key={alert.message} mb={2}>
                  <Chip
                    label={alert.severity}
                    color={
                      alert.severity === "Critical"
                        ? "error"
                        : alert.severity === "High"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2">{alert.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.eta}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
