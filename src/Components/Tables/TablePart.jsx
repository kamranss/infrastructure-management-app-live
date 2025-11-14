import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function TablePart({ thead = [], rows = [] }) {
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
          {rows.map((row, key) => {
            const statusclassName =
              row.status === "ACTIVE"
                ? "row-active"
                : row.status === "INACTIVE"
                ? "row-inactive"
                : row.status === "REPAIR"
                ? "row-repair"
                : row.status === "INUSE"
                ? "row-inuse"
                : "";

            return (
              <TableRow
                key={key}
                // className={`row ${statusclassName}`} // Add 'row' className and status className
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row?.id}</TableCell>

                <TableCell align="left">{row?.code}</TableCell>
                <TableCell align="left">{row?.name || "-"}</TableCell>
                <TableCell align="left">{row?.isActive || "-"}</TableCell>
                <TableCell align="left">{row?.isDeleted || "-"}</TableCell>
                <TableCell align="left">
                  {" "}
                  {moment(row?.createdDate).format("DD-MM-YYYY") || "-"}
                </TableCell>
                <TableCell align="left">
                  {" "}
                  {moment(row?.updatedDate).format("DD-MM-YYYY") || "-"}
                </TableCell>
                {/* <TableCell
                  className={
                    row.status === "ACTIVE" ? "row-active" : "" // Apply className if status is "ACTIVE"
                  }
                  align="left"
                >
                  {row?.status || "-"}
                </TableCell> */}

                <TableCell align="left">
                  {" "}
                  {moment(row?.removalDate).format("DD-MM-YYYY") || "-"}
                </TableCell>
                <TableCell align="left">{row?.createdBy || "-"}</TableCell>
                <TableCell align="left">{row?.modifiedBy || "-"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
