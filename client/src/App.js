import React, { useState, useEffect } from "react";
import DepositList from "./components/DepositList";
import { getDeposits } from "./services/api";
import { Toaster } from "react-hot-toast";

function App() {
  const [deposits, setDeposits] = useState([]);
  const [timeStamp, setTimeStamp] = useState();

  useEffect(() => {
    const fetchDeposits = async () => {
      const data = await getDeposits();
      setDeposits(data.deposits);
      setTimeStamp(data.currentTimeStamp);
    };

    // setInterval(() => {
    fetchDeposits();
    // }, deposits.REFRESH_DURATION || 15000);
  }, []);

  return (
    <div className="flex flex-col p-6 gap-4">
      <Toaster />
      <h1 className="text-5xl font-bolder">Ethereum Deposit Tracker</h1>
      <h2 className="text-2xl font-bold justify-between flex">
        Recent Deposits -
        <span>
          Current Time Stamp:
          {new Date(timeStamp).toLocaleString()}
        </span>
      </h2>
      <p>Refreshes every 15 seconds</p>
      <DepositList deposits={deposits} />
    </div>
  );
}

export default App;
