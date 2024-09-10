import React from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

function DepositList({ deposits }) {
  for (let dep of deposits) {
    if (dep.newDeposit === true) {
      toast.success(`New block ${dep.blockNum} added`);
    }
  }
  const columns = [
    { field: "blockNumber", headerName: "Block Number", width: 200 },
    { field: "timestamp", headerName: "Timestamp", width: 300 },
    { field: "fee", headerName: "Fee", width: 170 },
    { field: "hash", headerName: "Hash", width: 700 },
    {
      field: "newD",
      headerName: "New Deposit",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          {params.value ? <FaCheck color="green" /> : <GiCrossMark color="red" />}
        </div>
      ),
    },
  ];

  const rows = deposits?.map((deposit, index) => ({
    id: deposit.uniqueId,
    blockNumber: deposit.blockNum,
    timestamp: new Date(deposit.metadata.blockTimestamp).toLocaleString(),
    fee: `${deposit.value} ${deposit.asset}`,
    hash: `${deposit.hash}`,
    newD: deposit.newDeposit,
  }));

  return (
    <div className="">
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          sx={{ border: 1 }}
          clipboardCopyCellDelimiter
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </div>
  );
}

export default DepositList;
