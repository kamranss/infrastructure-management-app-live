// import React, { useState } from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import MpFilterAndTable from "../Components/Tabs/MpFilterAndTable";
// import PartFilterAndTable from "../Components/Tabs/PartFilterAndTable";
// import ServiceFilterAndTable from "../Components/Tabs/ServiceFilterAndTable";
// import BuildIcon from "@mui/icons-material/Build";
// import ExtensionIcon from "@mui/icons-material/Extension";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
// import "../styles/_MpTabs.scss";

// const MaintenanceOverview = () => {
//   const [selectedTab, setSelectedTab] = useState(0);

//   const tabOptions = [
//     { label: "MP", icon: <BuildIcon /> },
//     { label: "Part", icon: <ExtensionIcon /> },
//     { label: "Service", icon: <SettingsSuggestIcon /> },
//   ];

//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case 0:
//         return <MpFilterAndTable />;
//       case 1:
//         return <PartFilterAndTable />;
//       case 2:
//         return <ServiceFilterAndTable />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Grid container className="maintenance-container">
//       {/* Sidebar Tabs with Card-style background */}
//       <Grid item xs={12} md={2}>
//         <Paper elevation={2} className="maintenance-sidebar-paper">
//           <Box className="maintenance-sidebar">
//             {tabOptions.map((tab, index) => (
//               <div
//                 key={index}
//                 className={`tab-item ${selectedTab === index ? "active" : ""}`}
//                 onClick={() => setSelectedTab(index)}
//               >
//                 {tab.icon}
//                 <span>{tab.label}</span>
//               </div>
//             ))}
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Content Area */}
//       <Grid item xs={12} md={10}>
//         <Box p={2}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             {renderTabContent()}
//           </Paper>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default MaintenanceOverview;

import React, { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import MpFilterAndTable from "../Components/Tabs/MpFilterAndTable";
import PartFilterAndTable from "../Components/Tabs/PartFilterAndTable";
import ServiceFilterAndTable from "../Components/Tabs/ServiceFilterAndTable";
import BuildIcon from "@mui/icons-material/Build";
import ExtensionIcon from "@mui/icons-material/Extension";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StatusCard from "../Components/Card/StatusCard"; // ✅ Import your card
import { statCardPalette } from "../constants/uiPalette";
import "../styles/_MpTabs.scss";

const MaintenanceOverview = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabOptions = [
    { label: "MP", icon: <BuildIcon /> },
    { label: "Part", icon: <ExtensionIcon /> },
    { label: "Service", icon: <SettingsSuggestIcon /> },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <MpFilterAndTable />;
      case 1:
        return <PartFilterAndTable />;
      case 2:
        return <ServiceFilterAndTable />;
      default:
        return null;
    }
  };

  const dummyStats = {
    total: 120,
    active: 85,
    inactive: 35,
  };

  const statusCards = [
    { title: "Total", value: dummyStats.total },
    { title: "Active", value: dummyStats.active },
    { title: "Inactive", value: dummyStats.inactive },
  ];

  const renderTopCards = () => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {statusCards.map((card, index) => {
        const palette = statCardPalette[index % statCardPalette.length];
        return (
          <Grid item xs={12} sm={4} key={card.title}>
            <StatusCard
              title={card.title}
              value={card.value}
              color={palette.accent}
              surface={palette.surface}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Grid container className="maintenance-container">
      <Grid item xs={12} md={2}>
        <Paper elevation={2} className="maintenance-sidebar-paper">
          <Box className="maintenance-sidebar">
            {tabOptions.map((tab, index) => (
              <div
                key={index}
                className={`tab-item ${selectedTab === index ? "active" : ""}`}
                onClick={() => setSelectedTab(index)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            ))}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={10}>
        <Box p={2}>
          {renderTopCards()}
          <Paper elevation={3} sx={{ p: 2 }}>
            {renderTabContent()}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MaintenanceOverview;

