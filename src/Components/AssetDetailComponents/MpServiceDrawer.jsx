// import React, { useEffect, useState } from "react";
// import ServiceCompleteDrawer from "./ServiceCompleteDrawer";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   Divider,
//   Paper,
// } from "@mui/material";
// import PaginationComponent2 from "../Common/PaginationComponent2";
// import axios from "axios";

// const MpServiceDrawer = ({ open, onClose, maintenancePlan, equipmentId }) => {
//   const [services, setServices] = useState({ items: [], totalCount: 0 });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [selectedService, setSelectedService] = useState(null);
//   const [showCompleteDrawer, setShowCompleteDrawer] = useState(false);

//   const fetchServices = async (pageNumber = 1) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_MP_SERVICES_BY_MP
//         }/${maintenancePlan?.id}`,
//         {
//           params: { pageNumber, pageSize },
//         }
//       );
//       console.log("Service data:", res.data);
//       setServices(res.data || { items: [], totalCount: 0 });
//     } catch (error) {
//       console.error("Failed to fetch services:", error);
//       setServices({ items: [], totalCount: 0 });
//     }
//   };

//   useEffect(() => {
//     if (open && maintenancePlan?.id) {
//       fetchServices(page);
//     }
//   }, [open, maintenancePlan?.id, page, pageSize]);

//   const renderActionButton = (type) => {
//     switch (type?.toLowerCase()) {
//       case "replace":
//         return <Button variant="outlined">Replace</Button>;
//       case "refill":
//         return <Button variant="outlined">Refill</Button>;
//       case "checkup":
//         return <Button variant="outlined">Checkup</Button>;
//       default:
//         return <span style={{ color: "gray" }}>Unknown</span>;
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: "37%",
//           height: "65%",
//           marginTop: "17%",
//           borderTopLeftRadius: 16,
//           borderBottomLeftRadius: 16,
//           overflow: "hidden",
//           p: 2,
//           bgcolor: "#f9f9f9",
//         },
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Maintenance Plan Services
//       </Typography>

//       {/* Top Card */}
//       <Box p={2} mb={2} borderRadius={2} bgcolor="#e3f2fd">
//         <Typography variant="subtitle1" fontWeight="bold">
//           {maintenancePlan?.name || "N/A"}
//         </Typography>
//         <Typography variant="body2">
//           {maintenancePlan?.description || "No description"}
//         </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       {/* Service Table */}
//       <Box component={Paper} variant="outlined">
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Service Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {services.items.map((service) => (
//               <TableRow key={service.id}>
//                 <TableCell>{service.name}</TableCell>
//                 <TableCell>{service.serviceDescription}</TableCell>
//                 <TableCell>{service.serviceType}</TableCell>
//                 <TableCell>{renderActionButton(service.serviceType)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <ServiceCompleteDrawer
//           open={showCompleteDrawer}
//           onClose={() => setShowCompleteDrawer(false)}
//           service={selectedService}
//           mp={maintenancePlan}
//           equipment={{ id: equipmentId, name: "Equipment Name" }} // replace name with correct one if you have
//           parts={equipmentDetail?.partList || []} // You’ll pass this from parent
//           onSuccess={() => fetchServices(page)} // refresh service list
//         />
//       </Box>

//       <PaginationComponent2
//         size={pageSize}
//         setSize={setPageSize}
//         page={page}
//         setPage={setPage}
//         count={services.totalCount}
//         recordSize={pageSize}
//       />
//     </Drawer>
//   );
// };

// export default MpServiceDrawer;

// import React, { useEffect, useState } from "react";
// import ServiceCompleteDrawer from "./ServiceCompleteDrawer";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   Divider,
//   Paper,
// } from "@mui/material";
// import PaginationComponent2 from "../Common/PaginationComponent2";
// import axios from "axios";

// const MpServiceDrawer = ({
//   open,
//   onClose,
//   maintenancePlan,
//   equipmentId,
//   equipmentDetail,
//   serviceStatuses = [],
// }) => {
//   const [services, setServices] = useState({ items: [], totalCount: 0 });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [selectedService, setSelectedService] = useState(null);
//   const [showCompleteDrawer, setShowCompleteDrawer] = useState(false);
//   const showSnackbar = (message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const isServiceCompleted = (serviceId) => {
//     const mpStatus = serviceStatuses.find(
//       (s) => s.mpId === maintenancePlan?.id
//     );
//     return (
//       mpStatus?.statuses?.find((x) => x.serviceId === serviceId)?.isCompleted ??
//       false
//     );
//   };

//   const fetchServices = async (pageNumber = 1) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_MP_SERVICES_BY_MP
//         }/${maintenancePlan?.id}`,
//         {
//           params: { pageNumber, pageSize },
//         }
//       );
//       setServices(res.data || { items: [], totalCount: 0 });
//     } catch (error) {
//       console.error("Failed to fetch services:", error);
//       setServices({ items: [], totalCount: 0 });
//     }
//   };

//   useEffect(() => {
//     if (open && maintenancePlan?.id) {
//       fetchServices(page);
//     }
//   }, [open, maintenancePlan?.id, page, pageSize]);

//   const renderActionButton = (service) => {
//     const type = service?.serviceType?.toLowerCase();
//     return (
//       <Button
//         variant="outlined"
//         onClick={() => {
//           setSelectedService(service);
//           setShowCompleteDrawer(true);
//         }}
//       >
//         {type === "replace" || type === "refill" || type === "checkup"
//           ? type.charAt(0).toUpperCase() + type.slice(1)
//           : "Action"}
//       </Button>
//     );
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: "37%",
//           height: "70%",
//           marginTop: "17%",
//           borderTopLeftRadius: 16,
//           borderBottomLeftRadius: 16,
//           overflow: "hidden",
//           p: 2,
//           bgcolor: "#f9f9f9",
//         },
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Maintenance Plan Services
//       </Typography>

//       <Divider sx={{ my: 2 }} />
//       {/* Top Card */}
//       <Box p={2} mb={2} borderRadius={2} bgcolor="#e3f2fd">
//         <Typography variant="subtitle1" fontWeight="bold">
//           {maintenancePlan?.name || "N/A"}
//         </Typography>
//         <Typography variant="body2">
//           {maintenancePlan?.description || "No description"}
//         </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       {/* Service Table */}
//       <Box mt={8} component={Paper} variant="outlined">
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Service Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {services.items.map((service) => (
//               <TableRow key={service.id}>
//                 <TableCell>{service.name}</TableCell>
//                 <TableCell>{service.serviceDescription}</TableCell>
//                 <TableCell>{service.serviceType}</TableCell>
//                 <TableCell>{renderActionButton(service)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>

//       {/* Bottom drawer to complete service */}
//       {selectedService && maintenancePlan && equipmentDetail && (
//         // <ServiceCompleteDrawer
//         //   open={showCompleteDrawer}
//         //   onClose={() => setShowCompleteDrawer(false)}
//         //   service={selectedService}
//         //   mp={maintenancePlan}
//         //   equipment={{
//         //     id: equipmentId,
//         //     name: equipmentDetail?.name || "N/A",
//         //   }}
//         //   parts={equipmentDetail?.partList || []}
//         //   onSuccess={() => fetchServices(page)}
//         // />
//         <ServiceCompleteDrawer
//           open={showCompleteDrawer}
//           onClose={() => setShowCompleteDrawer(false)}
//           service={selectedService}
//           mp={maintenancePlan}
//           equipment={{
//             id: equipmentId,
//             name: equipmentDetail?.name || "N/A",
//           }}
//           parts={equipmentDetail?.partList || []}
//           onSuccess={() => fetchServices(page)}
//           showSnackbar={showSnackbar} // ✅ Add this line
//         />
//       )}

//       <PaginationComponent2
//         size={pageSize}
//         setSize={setPageSize}
//         page={page}
//         setPage={setPage}
//         count={services.totalCount}
//         recordSize={pageSize}
//       />
//     </Drawer>
//   );
// };

// export default MpServiceDrawer;

// import React, { useEffect, useState } from "react";
// import ServiceCompleteDrawer from "./ServiceCompleteDrawer";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   Divider,
//   Paper,
// } from "@mui/material";
// import PaginationComponent2 from "../Common/PaginationComponent2";
// import axios from "axios";
// import clock from "/src/assets/icons/clock.png";
// import correct from "/src/assets/icons/correct.png";

// const MpServiceDrawer = ({
//   open,
//   onClose,
//   maintenancePlan,
//   equipmentId,
//   equipmentDetail,
//   serviceStatuses = [],
// }) => {
//   const [services, setServices] = useState({ items: [], totalCount: 0 });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [selectedService, setSelectedService] = useState(null);
//   const [showCompleteDrawer, setShowCompleteDrawer] = useState(false);
//   const showSnackbar = (message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const isServiceCompleted = (serviceId) => {
//     const mpStatus = serviceStatuses.find(
//       (s) => s.mpId === maintenancePlan?.id
//     );
//     return (
//       mpStatus?.statuses?.find((x) => x.serviceId === serviceId)?.isCompleted ??
//       false
//     );
//   };

//   const fetchServices = async (pageNumber = 1) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_MP_SERVICES_BY_MP
//         }/${maintenancePlan?.id}`,
//         {
//           params: { pageNumber, pageSize },
//         }
//       );
//       setServices(res.data || { items: [], totalCount: 0 });
//     } catch (error) {
//       console.error("Failed to fetch services:", error);
//       setServices({ items: [], totalCount: 0 });
//     }
//   };

//   useEffect(() => {
//     if (open && maintenancePlan?.id) {
//       fetchServices(page);
//     }
//   }, [open, maintenancePlan?.id, page, pageSize]);

//   const renderActionButton = (service) => {
//     const type = service?.serviceType?.toLowerCase();
//     return (
//       <Button
//         variant="outlined"
//         onClick={() => {
//           setSelectedService(service);
//           setShowCompleteDrawer(true);
//         }}
//       >
//         {type === "replace" || type === "refill" || type === "checkup"
//           ? type.charAt(0).toUpperCase() + type.slice(1)
//           : "Action"}
//       </Button>
//     );
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: "37%",
//           height: "70%",
//           marginTop: "17%",
//           borderTopLeftRadius: 16,
//           borderBottomLeftRadius: 16,
//           overflow: "hidden",
//           p: 2,
//           bgcolor: "#f9f9f9",
//         },
//       }}
//     >
//       <style>
//         {`
//           @keyframes blinkRed {
//             0% { opacity: 1; }
//             50% { opacity: 0.1; }
//             100% { opacity: 1; }
//           }
//         `}
//       </style>

//       <Typography variant="h6" gutterBottom>
//         Maintenance Plan Services
//       </Typography>

//       <Divider sx={{ my: 2 }} />
//       <Box p={2} mb={2} borderRadius={2} bgcolor="#e3f2fd">
//         <Typography variant="subtitle1" fontWeight="bold">
//           {maintenancePlan?.name || "N/A"}
//         </Typography>
//         <Typography variant="body2">
//           {maintenancePlan?.description || "No description"}
//         </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box mt={8} component={Paper} variant="outlined">
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Status</TableCell>
//               <TableCell>Service Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {services.items.map((service) => {
//               const completed = isServiceCompleted(service.id);
//               return (
//                 <TableRow key={service.id}>
//                   <TableCell>
//                     <img
//                       src={completed ? correct : clock}
//                       alt={completed ? "Completed" : "Pending"}
//                       title={completed ? "Completed" : "Pending"}
//                       style={{
//                         width: "24px",
//                         height: "24px",
//                         animation: completed
//                           ? "none"
//                           : "blinkRed 1s linear infinite",
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>{service.name}</TableCell>
//                   <TableCell>{service.serviceDescription}</TableCell>
//                   <TableCell>{service.serviceType}</TableCell>
//                   <TableCell>{renderActionButton(service)}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </Box>

//       {selectedService && maintenancePlan && equipmentDetail && (
//         <ServiceCompleteDrawer
//           open={showCompleteDrawer}
//           onClose={() => setShowCompleteDrawer(false)}
//           service={selectedService}
//           mp={maintenancePlan}
//           equipment={{
//             id: equipmentId,
//             name: equipmentDetail?.name || "N/A",
//           }}
//           parts={equipmentDetail?.partList || []}
//           onSuccess={() => fetchServices(page)}
//           showSnackbar={showSnackbar}
//         />
//       )}

//       <PaginationComponent2
//         size={pageSize}
//         setSize={setPageSize}
//         page={page}
//         setPage={setPage}
//         count={services.totalCount}
//         recordSize={pageSize}
//       />
//     </Drawer>
//   );
// };

// export default MpServiceDrawer;

import React, { useEffect, useState } from "react";
import ServiceCompleteDrawer from "./ServiceCompleteDrawer";
import {
  Box,
  Typography,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import PaginationComponent2 from "../Common/PaginationComponent2";
import axios from "axios";
import clock from "/src/assets/icons/clock.png";
import correct from "/src/assets/icons/correct.png";

const MpServiceDrawer = ({
  open,
  onClose,
  maintenancePlan,
  equipmentId,
  equipmentDetail,
  serviceStatuses = [],
  onRefresh,
}) => {
  const [services, setServices] = useState({ items: [], totalCount: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedService, setSelectedService] = useState(null);
  const [showCompleteDrawer, setShowCompleteDrawer] = useState(false);

  const isServiceCompleted = (serviceId) => {
    const mpStatus = serviceStatuses.find(
      (s) => s.mpId === maintenancePlan?.id
    );
    return (
      mpStatus?.statuses?.find((x) => x.serviceId === serviceId)?.isCompleted ??
      false
    );
  };

  const fetchServices = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_MP_SERVICES_BY_MP
        }/${maintenancePlan?.id}`,
        { params: { pageNumber, pageSize } }
      );
      setServices(res.data || { items: [], totalCount: 0 });
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices({ items: [], totalCount: 0 });
    }
  };

  useEffect(() => {
    if (open && maintenancePlan?.id) {
      fetchServices(page);
    }
  }, [open, maintenancePlan?.id, page, pageSize]);

  const handleSuccess = () => {
    fetchServices(page);
    setSelectedService(null);
    setShowCompleteDrawer(false);
  };

  const renderStatusIcon = (completed) => (
    <img
      src={completed ? correct : clock}
      alt={completed ? "Completed" : "Pending"}
      title={completed ? "Completed" : "Pending"}
      style={{
        width: "24px",
        height: "24px",
        animation: completed ? "none" : "blinkRed 1s linear infinite",
      }}
    />
  );

  const renderActionButton = (service) => {
    const type = service?.serviceType?.toLowerCase();
    const completed = isServiceCompleted(service.id);

    return (
      <Button
        variant="outlined"
        onClick={() => {
          setSelectedService(service);
          setShowCompleteDrawer(true);
        }}
        disabled={completed}
      >
        {["replace", "refill", "checkup"].includes(type)
          ? type.charAt(0).toUpperCase() + type.slice(1)
          : "Action"}
      </Button>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        onClose();
        setSelectedService(null);
        setShowCompleteDrawer(false);
      }}
      PaperProps={{
        sx: {
          width: "37%",
          height: "70%",
          marginTop: "17%",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          overflow: "hidden",
          p: 2,
          bgcolor: "#f9f9f9",
        },
      }}
    >
      <style>
        {`
          @keyframes blinkRed {
            0% { opacity: 1; }
            50% { opacity: 0.1; }
            100% { opacity: 1; }
          }
        `}
      </style>

      <Typography variant="h6" gutterBottom>
        Maintenance Plan Services
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Box p={2} mb={2} borderRadius={2} bgcolor="#e3f2fd">
        <Typography variant="subtitle1" fontWeight="bold">
          {maintenancePlan?.name || "N/A"}
        </Typography>
        <Typography variant="body2">
          {maintenancePlan?.description || "No description"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mt={8} component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.items.map((service) => {
              const completed = isServiceCompleted(service.id);
              return (
                <TableRow key={service.id}>
                  <TableCell>{renderStatusIcon(completed)}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.serviceDescription}</TableCell>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>{renderActionButton(service)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      {selectedService && maintenancePlan && equipmentDetail && (
        // <ServiceCompleteDrawer
        //   open={showCompleteDrawer}
        //   onClose={() => setShowCompleteDrawer(false)}
        //   service={selectedService}
        //   mp={maintenancePlan}
        //   equipment={{
        //     id: equipmentId,
        //     name: equipmentDetail?.name || "N/A",
        //   }}
        //   parts={equipmentDetail?.partList || []}
        //   onSuccess={handleSuccess}
        // />
        <ServiceCompleteDrawer
          open={showCompleteDrawer}
          onClose={() => setShowCompleteDrawer(false)}
          service={selectedService}
          mp={maintenancePlan}
          equipment={{
            id: equipmentId,
            name: equipmentDetail?.name || "N/A",
          }}
          parts={equipmentDetail?.partList || []}
          // onSuccess={() => {
          //   fetchServices(page); // ✅ refresh internal drawer
          //   refreshStatuses?.(); // ✅ refresh parent serviceStatuses and MP table
          // }}
          onSuccess={() => {
            fetchServices(page); // ✅ update services list
            onRefresh?.(); // ✅ update asset page status icons
          }}
        />
      )}

      <PaginationComponent2
        size={pageSize}
        setSize={setPageSize}
        page={page}
        setPage={setPage}
        count={services.totalCount}
        recordSize={pageSize}
      />
    </Drawer>
  );
};

export default MpServiceDrawer;
