import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function TableManufacture({ thead = [], rows = [] }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
              <TableCell align="left">{row?.departmentId || "-"}</TableCell>
              <TableCell align="left">{row?.department || "-"}</TableCell>
              <TableCell align="left">{row?.isdeleted || "-"}</TableCell>
              <TableCell align="left">{row?.isactive || "-"}</TableCell>
              <TableCell align="left">
                {moment(row?.createddate).format("DD-MM-YYYY") || "-"}
              </TableCell>

              <TableCell align="left">{row?.createdby || "-"}</TableCell>

              <TableCell align="left">
                {" "}
                {moment(row?.updateddate).format("DD-MM-YYYY") || "-"}
              </TableCell>

              <TableCell align="left">
                {moment(row?.modifiedby).format("DD-MM-YYYY") || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
