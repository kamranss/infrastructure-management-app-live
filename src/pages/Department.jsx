import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TableHeader from "../Components/TableHeader";
import PaginationComponent from "../Components/PaginationComponent";
import axios from "axios";
import { TableHead } from "@mui/material";
import SideBarEquipment from "../Components/SideBarEquipment";
// import HeaderNav from "../Components/Common/HeaderNav";
import TableDepartment from "../Components/Tables/TableDepartment";

const Department = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [departmentData, setDepartmentdata] = useState();

  // useEffect(() => {
  //   axios
  //     .get("https://localhost:7066/api/Department/All", {
  //       params: { page: page, pageSize: size },
  //     })
  //     .then((res) => setDepartmentdata(res.data.result.data));
  // }, [page, size]);

  useEffect(() => {
    axios
      .get("https://localhost:7066/api/Department/All", {
        params: { page: page, pageSize: size },
      })
      .then((res) => {
        console.log("Response:", res.data); // Log the entire response
        console.log("Items:", res.data); // Log the items array
        console.log("Current Page:", res.data.currentPage); // Log the current page
        console.log("Page Count:", res.data.pageCount); // Log the page count
        console.log("Total Count:", res.data.totalCount); // Log the total count
        setDepartmentdata(res.data); // Set the department data
      })
      .catch((err) => console.log(err));
  }, [page, size]);
  console.log(departmentData);
  return (
    <div className="department-main">
      {/* <HeaderNav />; */}
      <div className="dep-mid">
        <SideBarEquipment />
        <div className="page-content">
          {/* <TableComponent
          thead={["name", "surname"]}
          tbody={[
            { name: "Kamran", surname: "Mahmudov" },
            { name: "Saduq", surname: "Mahmudov" },
          ]}
        /> */}
          <div>
            <TableHeader />
            {departmentData && (
              <>
                <TableDepartment
                  className="table"
                  thead={Object.keys(departmentData?.items?.[0])}
                  rows={departmentData?.items}
                />
                <PaginationComponent
                  page={page}
                  setPage={setPage}
                  recordSize={size}
                  count={departmentData?.totalCount} // *4
                  size={size}
                  setSize={setSize}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
