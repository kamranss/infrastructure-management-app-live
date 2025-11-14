// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   IconButton,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Collapse,
//   Box,
// } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";

// const CommonFilters = ({ filtersConfig = [], filters, onChange }) => {
//   const [showAll, setShowAll] = useState(false);
//   const visibleCount = 3;
//   const visibleFilters = showAll
//     ? filtersConfig
//     : filtersConfig.slice(0, visibleCount);

//   const inputSx = {
//     backgroundColor: "#e3f2fd", // Light blue background
//     borderRadius: "6px",
//     "& .MuiInputBase-root": {
//       height: "36px", // Compact input
//       fontSize: "0.85rem",
//     },
//     "& .MuiInputLabel-root": {
//       fontSize: "0.8rem",
//     },
//   };

//   return (
//     <Card
//       sx={{
//         mb: 2,
//         backgroundColor: "#dad7df",
//         borderRadius: 2,
//         boxShadow: "none",
//       }}
//     >
//       <CardContent sx={{ paddingBottom: "12px !important", pt: 2 }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={1}
//           height={1.3}
//         >
//           <Typography variant="subtitle1" fontWeight={600}>
//             {/* Filters */}
//           </Typography>
//           <IconButton onClick={() => setShowAll((prev) => !prev)} size="small">
//             {showAll ? <ExpandLess /> : <ExpandMore />}
//           </IconButton>
//         </Box>

//         <Collapse in={true}>
//           <Grid container spacing={1.5}>
//             {visibleFilters.map((filter) => (
//               <Grid item xs={12} sm={6} md={4} key={filter.name}>
//                 {filter.type === "select" ? (
//                   <TextField
//                     select
//                     fullWidth
//                     label={filter.label}
//                     value={filters[filter.name] || ""}
//                     onChange={(e) => onChange(filter.name, e.target.value)}
//                     size="small"
//                     sx={inputSx}
//                   >
//                     {(filter.options || []).map((opt, idx) => {
//                       const value = typeof opt === "object" ? opt.value : opt;
//                       const label = typeof opt === "object" ? opt.label : opt;
//                       return (
//                         <MenuItem
//                           key={`${filter.name}-${value}-${idx}`}
//                           value={value}
//                         >
//                           {label}
//                         </MenuItem>
//                       );
//                     })}
//                   </TextField>
//                 ) : (
//                   <TextField
//                     fullWidth
//                     type={filter.type}
//                     label={filter.label}
//                     value={filters[filter.name] || ""}
//                     onChange={(e) => onChange(filter.name, e.target.value)}
//                     size="small"
//                     sx={inputSx}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>
//         </Collapse>

//         {!showAll && filtersConfig.length > visibleCount && (
//           <Typography
//             variant="body2"
//             color="primary"
//             sx={{
//               mt: 1,
//               cursor: "pointer",
//               textAlign: "center",
//               fontSize: "0.8rem",
//               fontWeight: 500,
//             }}
//             onClick={() => setShowAll(true)}
//           >
//             Show more filters
//           </Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CommonFilters;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   IconButton,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Collapse,
//   Box,
// } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";

// const CommonFilters = ({ filtersConfig = [], filters, onChange }) => {
//   const [showAll, setShowAll] = useState(false);
//   const visibleCount = 3;
//   const visibleFilters = showAll
//     ? filtersConfig
//     : filtersConfig.slice(0, visibleCount);

//   const inputSx = {
//     backgroundColor: "#e3f2fd", // Light blue background
//     borderRadius: "6px",
//     "& .MuiInputBase-root": {
//       height: "36px",
//       fontSize: "0.85rem",
//     },
//     "& .MuiInputLabel-root": {
//       fontSize: "0.8rem",
//     },
//   };

//   return (
//     <Card
//       sx={{
//         mb: 2,
//         backgroundColor: "#e9e5f0",
//         borderRadius: 2,
//         boxShadow: "none",
//       }}
//     >
//       <CardContent sx={{ paddingBottom: "8px !important", pt: 2 }}>
//         <Collapse in={true}>
//           <Grid container spacing={0.5}>
//             {visibleFilters.map((filter) => (
//               <Grid item xs={12} sm={6} md={4} key={filter.name} sx={{ mb: 0 }}>
//                 {filter.type === "select" ? (
//                   <TextField
//                     select
//                     fullWidth
//                     label={filter.label}
//                     value={filters[filter.name] || ""}
//                     onChange={(e) => onChange(filter.name, e.target.value)}
//                     size="small"
//                     sx={inputSx}
//                   >
//                     {(filter.options || []).map((opt, idx) => {
//                       const value = typeof opt === "object" ? opt.value : opt;
//                       const label = typeof opt === "object" ? opt.label : opt;
//                       return (
//                         <MenuItem
//                           key={`${filter.name}-${value}-${idx}`}
//                           value={value}
//                         >
//                           {label}
//                         </MenuItem>
//                       );
//                     })}
//                   </TextField>
//                 ) : (
//                   <TextField
//                     fullWidth
//                     type={filter.type}
//                     label={filter.label}
//                     value={filters[filter.name] || ""}
//                     onChange={(e) => onChange(filter.name, e.target.value)}
//                     size="small"
//                     sx={inputSx}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>
//         </Collapse>

//         {/* Collapse Toggle at Bottom Right */}
//         {filtersConfig.length > visibleCount && (
//           <Box display="flex" justifyContent="flex-end" mt={2}>
//             <IconButton
//               onClick={() => setShowAll((prev) => !prev)}
//               size="small"
//             >
//               {showAll ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CommonFilters;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const CommonFilters = ({ filtersConfig = [], filters, onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 3;
  const visibleFilters = showAll
    ? filtersConfig
    : filtersConfig.slice(0, visibleCount);

  const inputSx = {
    backgroundColor: "#e3f2fd",
    borderRadius: "6px",
    mb: "0px !important", // ✅ Kill margin under input
    "& .MuiInputBase-root": {
      height: "36px",
      fontSize: "0.85rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.8rem",
    },
  };

  return (
    <Card
      sx={{
        mb: 1,
        backgroundColor: "#e9e5f0",
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ pt: 1, pb: 1, "&:last-child": { pb: 1 } }}>
        <Collapse in={true}>
          <Grid container spacing={1}>
            {visibleFilters.map((filter) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={filter.name}
                sx={{ mb: "0 !important" }} // ✅ No bottom margin between items
              >
                {filter.type === "select" ? (
                  <TextField
                    select
                    fullWidth
                    label={filter.label}
                    value={filters[filter.name] || ""}
                    onChange={(e) => onChange(filter.name, e.target.value)}
                    size="small"
                    sx={inputSx}
                  >
                    {(filter.options || []).map((opt, idx) => {
                      const value = typeof opt === "object" ? opt.value : opt;
                      const label = typeof opt === "object" ? opt.label : opt;
                      return (
                        <MenuItem
                          key={`${filter.name}-${value}-${idx}`}
                          value={value}
                        >
                          {label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    type={filter.type}
                    label={filter.label}
                    value={filters[filter.name] || ""}
                    onChange={(e) => onChange(filter.name, e.target.value)}
                    size="small"
                    sx={inputSx}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Collapse>

        {filtersConfig.length > visibleCount && (
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <IconButton
              onClick={() => setShowAll((prev) => !prev)}
              size="small"
            >
              {showAll ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CommonFilters;
