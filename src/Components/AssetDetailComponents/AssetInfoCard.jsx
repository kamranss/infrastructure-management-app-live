// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Autocomplete,
// } from "@mui/material";
// import axios from "axios";

// const AssetInfoCard = ({ detail, onSave }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [assetData, setAssetData] = useState({});
//   const [originalData, setOriginalData] = useState({});
//   const [dropdowns, setDropdowns] = useState({
//     model: [],
//     type: [],
//     department: [],
//     manufacture: [],
//     operationSite: [],
//   });

//   const endpoints = {
//     model: "Model",
//     type: "EquipmentType",
//     department: "Department",
//     manufacture: "Manufacture",
//     operationSite: "OperationSite",
//   };

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const update_asset = import.meta.env.VITE_API_ASSET_UPDATE;

//   // Fetch dropdowns
//   useEffect(() => {
//     Object.keys(endpoints).forEach((key) => fetchDropdownData(key));
//   }, []);

//   const fetchDropdownData = async (key) => {
//     try {
//       const { data } = await axios.get(
//         `${baseUrl}/api/${endpoints[key]}/DropDown`
//       );
//       if (Array.isArray(data)) {
//         setDropdowns((prev) => ({ ...prev, [key]: data }));
//       }
//     } catch (err) {
//       console.error(`Failed to fetch ${key}:`, err);
//     }
//   };

//   // Set basic fields from detail
//   useEffect(() => {
//     if (!detail) return;
//     setAssetData(detail);
//     setOriginalData(detail);
//   }, [detail]);

//   // Merge dropdown objects once dropdowns are ready
//   useEffect(() => {
//     if (!detail) return;

//     const updated = {
//       model: dropdowns.model.find((x) => x.id === detail.modelId) || null,
//       type: dropdowns.type.find((x) => x.id === detail.equipmentTypeId) || null,
//       department:
//         dropdowns.department.find((x) => x.id === detail.departmentId) || null,
//       manufacture:
//         dropdowns.manufacture.find((x) => x.id === detail.manufactureId) ||
//         null,
//       operationSite:
//         dropdowns.operationSite.find((x) => x.id === detail.operationSiteId) ||
//         null,
//     };

//     setAssetData((prev) => ({ ...prev, ...updated }));
//   }, [dropdowns, detail]);

//   const handleChange = (field, value) => {
//     setAssetData((prev) => ({ ...prev, [field]: value }));
//   };

//   const hasChanges = JSON.stringify(assetData) !== JSON.stringify(originalData);

//   const handleSave = async () => {
//     const combined = (key) => assetData[key] ?? originalData[key] ?? null;

//     const payload = {
//       name: combined("name"),
//       unitNumber: combined("unitNumber"),
//       description: combined("description"),
//       color: combined("color"),
//       identification: combined("identification"),
//       productionYear: Number(combined("productionYear") || 0),
//       seriaNumber: combined("seriaNumber"),
//       capacity: combined("capacity"),
//       usageLocation: combined("usageLocation"),
//       modelId: combined("model")?.id,
//       equipmentTypeId: combined("type")?.id,
//       departmentId: combined("department")?.id,
//       manufactureId: combined("manufacture")?.id,
//       operationSiteId: combined("operationSite")?.id,
//     };

//     console.log("📦 Final Payload:", payload);

//     try {
//       await axios.put(`${baseUrl}${update_asset}${detail.id}`, payload);
//       onSave && onSave(assetData);
//       setEditMode(false);
//       setOriginalData(assetData);
//     } catch (error) {
//       console.error("❌ Update failed:", error);
//     }
//   };

//   const renderInputField = (key, label) => (
//     <Grid item xs={6} key={key}>
//       <TextField
//         label={label}
//         value={assetData[key] || ""}
//         onChange={(e) => handleChange(key, e.target.value)}
//         fullWidth
//         disabled={!editMode}
//       />
//     </Grid>
//   );

//   const renderAutocomplete = (fieldKey, label, dropdownKey) => (
//     <Grid item xs={6} key={fieldKey}>
//       <Autocomplete
//         disabled={!editMode}
//         options={dropdowns[dropdownKey] || []}
//         value={assetData[fieldKey] || null}
//         getOptionLabel={(option) => option?.name || ""}
//         isOptionEqualToValue={(option, value) => option?.id === value?.id}
//         onChange={(e, newVal) =>
//           setAssetData((prev) => ({
//             ...prev,
//             [fieldKey]: newVal || null,
//           }))
//         }
//         renderInput={(params) => (
//           <TextField {...params} label={label} fullWidth variant="outlined" />
//         )}
//       />
//     </Grid>
//   );

//   return (
//     <Paper elevation={3} sx={{ p: 2 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">Asset Info</Typography>
//         <Button
//           variant="outlined"
//           size="small"
//           onClick={() => setEditMode((prev) => !prev)}
//         >
//           {editMode ? "Cancel" : "Edit"}
//         </Button>
//       </Box>
//       <Grid container spacing={2} mt={1}>
//         {renderInputField("name", "Name")}
//         {renderInputField("description", "Description")}
//         {renderInputField("unitNumber", "Unit Number")}
//         {renderInputField("seriaNumber", "Serial Number")}
//         {renderInputField("productionYear", "Production Year")}
//         {renderInputField("color", "Color")}
//         {renderInputField("identification", "Identification")}
//         {renderInputField("capacity", "Capacity")}
//         {renderInputField("usageLocation", "Usage Location")}
//         {renderAutocomplete("type", "Type", "type")}
//         {renderAutocomplete("department", "Department", "department")}
//         {renderAutocomplete("manufacture", "Manufacture", "manufacture")}
//         {renderAutocomplete("model", "Model", "model")}
//         {renderAutocomplete("operationSite", "Operation Site", "operationSite")}
//       </Grid>

//       {editMode && (
//         <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               setEditMode(false);
//               setAssetData(originalData);
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             disabled={!hasChanges}
//           >
//             Save
//           </Button>
//         </Box>
//       )}
//     </Paper>
//   );
// };

// export default AssetInfoCard;

// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Autocomplete,
// } from "@mui/material";
// import axios from "axios";

// const AssetInfoCard = ({ detail, onSave }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [assetData, setAssetData] = useState({});
//   const [originalData, setOriginalData] = useState({});
//   const [dropdowns, setDropdowns] = useState({
//     model: [],
//     type: [],
//     department: [],
//     manufacture: [],
//     operationSite: [],
//   });

//   const endpoints = {
//     model: "Model",
//     type: "EquipmentType",
//     department: "Department",
//     manufacture: "Manufacture",
//     operationSite: "OperationSite",
//   };

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const update_asset = import.meta.env.VITE_API_ASSET_UPDATE;

//   useEffect(() => {
//     Object.keys(endpoints).forEach((key) => fetchDropdownData(key));
//   }, []);

//   const fetchDropdownData = async (key) => {
//     try {
//       const { data } = await axios.get(
//         `${baseUrl}/api/${endpoints[key]}/DropDown`
//       );
//       if (Array.isArray(data)) {
//         setDropdowns((prev) => ({ ...prev, [key]: data }));
//       }
//     } catch (err) {
//       console.error(`Failed to fetch ${key}:`, err);
//     }
//   };

//   useEffect(() => {
//     if (!detail) return;
//     setAssetData(detail);
//     setOriginalData(detail);
//   }, [detail]);

//   useEffect(() => {
//     if (!detail) return;

//     const updated = {
//       model: dropdowns.model.find((x) => x.id === detail.modelId) || null,
//       type: dropdowns.type.find((x) => x.id === detail.equipmentTypeId) || null,
//       department:
//         dropdowns.department.find((x) => x.id === detail.departmentId) || null,
//       manufacture:
//         dropdowns.manufacture.find((x) => x.id === detail.manufactureId) ||
//         null,
//       operationSite:
//         dropdowns.operationSite.find((x) => x.id === detail.operationSiteId) ||
//         null,
//     };

//     setAssetData((prev) => ({ ...prev, ...updated }));
//   }, [dropdowns, detail]);

//   const handleChange = (field, value) => {
//     setAssetData((prev) => ({ ...prev, [field]: value }));
//   };

//   const hasChanges = JSON.stringify(assetData) !== JSON.stringify(originalData);

//   const handleSave = async () => {
//     const combined = (key) => assetData[key] ?? originalData[key] ?? null;

//     const payload = {
//       name: combined("name"),
//       unitNumber: combined("unitNumber"),
//       description: combined("description"),
//       color: combined("color"),
//       identification: combined("identification"),
//       productionYear: Number(combined("productionYear") || 0),
//       seriaNumber: combined("seriaNumber"),
//       capacity: combined("capacity"),
//       usageLocation: combined("usageLocation"),
//       modelId: combined("model")?.id,
//       equipmentTypeId: combined("type")?.id,
//       departmentId: combined("department")?.id,
//       manufactureId: combined("manufacture")?.id,
//       operationSiteId: combined("operationSite")?.id,
//     };

//     console.log("📦 Final Payload:", payload);

//     try {
//       await axios.put(`${baseUrl}${update_asset}${detail.id}`, payload);
//       onSave && onSave(assetData);
//       setEditMode(false);
//       setOriginalData(assetData);
//     } catch (error) {
//       console.error("❌ Update failed:", error);
//     }
//   };

//   const renderInputField = (key, label) => (
//     <Grid item xs={6} key={key}>
//       <TextField
//         label={label}
//         value={assetData[key] || ""}
//         onChange={(e) => handleChange(key, e.target.value)}
//         fullWidth
//         disabled={!editMode}
//       />
//     </Grid>
//   );

//   const renderAutocomplete = (fieldKey, label, dropdownKey) => (
//     <Grid item xs={6} key={fieldKey}>
//       <Autocomplete
//         disabled={!editMode}
//         options={dropdowns[dropdownKey] || []}
//         value={assetData[fieldKey] || null}
//         getOptionLabel={(option) => option?.name || ""}
//         isOptionEqualToValue={(option, value) => option?.id === value?.id}
//         onChange={(e, newVal) =>
//           setAssetData((prev) => ({
//             ...prev,
//             [fieldKey]: newVal || null,
//           }))
//         }
//         renderInput={(params) => (
//           <TextField {...params} label={label} fullWidth variant="outlined" />
//         )}
//       />
//     </Grid>
//   );

//   return (
//     <Paper elevation={3} sx={{ p: 2 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">Asset Info</Typography>
//         <Button
//           variant="outlined"
//           size="small"
//           onClick={() => setEditMode((prev) => !prev)}
//         >
//           {editMode ? "Cancel" : "Edit"}
//         </Button>
//       </Box>
//       <Grid container spacing={2} mt={1}>
//         {renderInputField("name", "Name")}
//         {renderInputField("description", "Description")}
//         {renderInputField("unitNumber", "Unit Number")}
//         {renderInputField("seriaNumber", "Serial Number")}
//         {renderInputField("productionYear", "Production Year")}
//         {renderInputField("color", "Color")}
//         {renderInputField("identification", "Identification")}
//         {renderInputField("capacity", "Capacity")}
//         {renderInputField("usageLocation", "Usage Location")}
//         {renderAutocomplete("type", "Type", "type")}
//         {renderAutocomplete("department", "Department", "department")}
//         {renderAutocomplete("manufacture", "Manufacture", "manufacture")}
//         {renderAutocomplete("model", "Model", "model")}
//         {renderAutocomplete("operationSite", "Operation Site", "operationSite")}
//       </Grid>

//       {editMode && (
//         <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               setEditMode(false);
//               setAssetData(originalData);
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             disabled={!hasChanges}
//           >
//             Save
//           </Button>
//         </Box>
//       )}
//     </Paper>
//   );
// };

// export default AssetInfoCard;

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const AssetInfoCard = ({ detail, onSave, showSnackbar }) => {
  const [editMode, setEditMode] = useState(false);
  const [assetData, setAssetData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [dropdowns, setDropdowns] = useState({
    model: [],
    type: [],
    department: [],
    manufacture: [],
    operationSite: [],
  });

  const endpoints = {
    model: "Model",
    type: "EquipmentType",
    department: "Department",
    manufacture: "Manufacture",
    operationSite: "OperationSite",
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const update_asset = import.meta.env.VITE_API_ASSET_UPDATE;

  useEffect(() => {
    Object.keys(endpoints).forEach((key) => fetchDropdownData(key));
  }, []);

  const fetchDropdownData = async (key) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/${endpoints[key]}/DropDown`
      );
      if (Array.isArray(data)) {
        setDropdowns((prev) => ({ ...prev, [key]: data }));
      }
    } catch (err) {
      console.error(`Failed to fetch ${key}:`, err);
    }
  };

  useEffect(() => {
    if (!detail) return;
    setAssetData(detail);
    setOriginalData(detail);
  }, [detail]);

  useEffect(() => {
    if (!detail) return;

    const updated = {
      model: dropdowns.model.find((x) => x.id === detail.modelId) || null,
      type: dropdowns.type.find((x) => x.id === detail.equipmentTypeId) || null,
      department:
        dropdowns.department.find((x) => x.id === detail.departmentId) || null,
      manufacture:
        dropdowns.manufacture.find((x) => x.id === detail.manufactureId) ||
        null,
      operationSite:
        dropdowns.operationSite.find((x) => x.id === detail.operationSiteId) ||
        null,
    };

    setAssetData((prev) => ({ ...prev, ...updated }));
  }, [dropdowns, detail]);

  const handleChange = (field, value) => {
    setAssetData((prev) => ({ ...prev, [field]: value }));
  };

  const hasChanges = JSON.stringify(assetData) !== JSON.stringify(originalData);

  const handleSave = async () => {
    const combined = (key) => assetData[key] ?? originalData[key] ?? null;

    const payload = {
      name: combined("name"),
      unitNumber: combined("unitNumber"),
      description: combined("description"),
      color: combined("color"),
      identification: combined("identification"),
      productionYear: Number(combined("productionYear") || 0),
      seriaNumber: combined("seriaNumber"),
      capacity: combined("capacity"),
      usageLocation: combined("usageLocation"),
      modelId: combined("model")?.id,
      equipmentTypeId: combined("type")?.id,
      departmentId: combined("department")?.id,
      manufactureId: combined("manufacture")?.id,
      operationSiteId: combined("operationSite")?.id,
    };

    try {
      await axios.put(`${baseUrl}${update_asset}${detail.id}`, payload);
      onSave && onSave(assetData);
      setEditMode(false);
      setOriginalData(assetData);

      showSnackbar?.({
        open: true,
        message: "Asset updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("❌ Update failed:", error);
      showSnackbar?.({
        open: true,
        message: "Failed to update asset",
        severity: "error",
      });
    }
  };

  const renderInputField = (key, label) => (
    <Grid item xs={6} key={key}>
      <TextField
        label={label}
        value={assetData[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        fullWidth
        disabled={!editMode}
      />
    </Grid>
  );

  const renderAutocomplete = (fieldKey, label, dropdownKey) => (
    <Grid item xs={6} key={fieldKey}>
      <Autocomplete
        disabled={!editMode}
        options={dropdowns[dropdownKey] || []}
        value={assetData[fieldKey] || null}
        getOptionLabel={(option) => option?.name || ""}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(e, newVal) =>
          setAssetData((prev) => ({
            ...prev,
            [fieldKey]: newVal || null,
          }))
        }
        renderInput={(params) => (
          <TextField {...params} label={label} fullWidth variant="outlined" />
        )}
      />
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Asset Info</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Grid container spacing={2} mt={1}>
        {renderInputField("name", "Name")}
        {renderInputField("description", "Description")}
        {renderInputField("unitNumber", "Unit Number")}
        {renderInputField("seriaNumber", "Serial Number")}
        {renderInputField("productionYear", "Production Year")}
        {renderInputField("color", "Color")}
        {renderInputField("identification", "Identification")}
        {renderInputField("capacity", "Capacity")}
        {renderInputField("usageLocation", "Usage Location")}
        {renderAutocomplete("type", "Type", "type")}
        {renderAutocomplete("department", "Department", "department")}
        {renderAutocomplete("manufacture", "Manufacture", "manufacture")}
        {renderAutocomplete("model", "Model", "model")}
        {renderAutocomplete("operationSite", "Operation Site", "operationSite")}
      </Grid>

      {editMode && (
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(false);
              setAssetData(originalData);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AssetInfoCard;
