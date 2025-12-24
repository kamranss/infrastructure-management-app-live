import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TableHeader from "../Components/TableHeader";
import PaginationComponent from "../Components/PaginationComponent";
import { TableHead } from "@mui/material";
import SideBarEquipment from "../Components/SideBarEquipment";
// import HeaderNav from "../Components/Common/HeaderNav";
import TableDepartment from "../Components/Tables/TableDepartment";
import { fetchDepartments } from "../api/services/departmentService";

const Department = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [departmentData, setDepartmentdata] = useState({ items: [], totalCount: 0 });

  // useEffect(() => {
  //   axios
  //     .get("https://localhost:7066/api/Department/All", {
  //       params: { page: page, pageSize: size },
  //     })
  //     .then((res) => setDepartmentdata(res.data.result.data));
  // }, [page, size]);

  useEffect(() => {
    fetchDepartments({ page, pageSize: size }).then((res) =>
      setDepartmentdata({
        items: res.items || [],
        totalCount: res.totalCount || 0,
      })
    );
  }, [page, size]);
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
