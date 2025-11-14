import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const MpDetailPage = () => {
  const { id } = useParams();
  const [mp, setMp] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/MaintenancePlan/${id}`)
      .then(res => setMp(res.data))
      .catch(err => console.error("Failed to fetch MP details:", err));
  }, [id]);

  if (!mp) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5">Maintenance Plan Details</Typography>
      <Typography>ID: {mp.id}</Typography>
      <Typography>Code: {mp.code}</Typography>
      <Typography>Name: {mp.name}</Typography>
      <Typography>Description: {mp.description}</Typography>
      {/* Add update/delete/edit forms here later */}
    </Box>
  );
};

export default MpDetailPage;
