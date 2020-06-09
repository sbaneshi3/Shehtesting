import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";
export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1`).then((res) => {
      if (res.status === 200) {
        setRows(res.data);
      }
    });
  }, [refresh]);
  const handleDelete = (e, id) => {
    axios.delete(`http://localhost:8080/api/v1/${id}`).then((res) => {
      if (res.status === 200) {
        setRefresh(!refresh);
      }
    });
  };
  return (
    <TableContainer
      style={{ width: "max-content", marginTop: "25%" }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">isRecruiter</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.fName}</TableCell>
              <TableCell align="right">{row.lName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.recruiter.toString()}</TableCell>
              <TableCell
                align="right"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDelete(e, row.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
