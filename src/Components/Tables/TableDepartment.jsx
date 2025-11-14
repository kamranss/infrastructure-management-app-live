import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function TableDepartment({ thead = [], rows = [] }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            {thead?.map((th, key) => (
              <TableCell key={key}>{th}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row?.id}</TableCell>
              <TableCell align="left">{row?.name}</TableCell>
              <TableCell align="left">{row?.departmentHead || "-"}</TableCell>
              <TableCell align="left">{row?.description || "-"}</TableCell>
              <TableCell align="left">
                {moment(row?.createdDate).format("DD-MM-YYYY") || "-"}
              </TableCell>
              <TableCell align="left">
                {row?.equipments?.length > 0 ? row?.equipments : "-"}
              </TableCell>
              {/* <TableCell align="right">{row?.isActive}</TableCell> */}
              {/* <TableCell align="right">{row?.isDeleted}</TableCell> */}
              {/* <TableCell align="right">{row?.updatedDate}</TableCell> */}
              {/* <TableCell align="right">{row?.createdBy}</TableCell> */}
              {/* <TableCell align="right">{row?.modifiedBy}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
