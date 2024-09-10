# Ethereum Deposit Tracker

## Description

Ethereum Deposit Tracker is a web application designed to monitor and display recent deposits to the Ethereum Beacon Deposit Contract. It fetches the latest deposits and provides real-time updates on new transactions. Built using React for the frontend and Node.js with Alchemy for the backend, this application offers a comprehensive view of Ethereum deposits.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Material-UI
- **Backend**: Node.js, Express, Alchemy SDK

## Features

- **Real-Time Updates**: The application automatically refreshes every 15 seconds to show the latest deposits.
- **Deposit List**: Displays recent deposits with details.
- **Current Timestamp**: Shows the current UTC timestamp of the latest deposit.
- **Backend Logging**: Logs important events and errors using Winston.

## API Calls

| Endpoint                    | Method | Description                           |
| --------------------------- | ------ | ------------------------------------- |
| `/api/deposits/getDeposits` | POST   | Fetches the latest Ethereum deposits. |

## Dependencies

### Backend

```json
    alchemy-sdk,
    cors,
    dotenv,
    express,
    winston
```

### Frontend

```json
    @emotion/react,
    @emotion/styled,
    @mui/material,
    @mui/x-data-grid,
    axios,
    react-hot-toast,
    react-icons,
```

## Author

[Kamil Dehliwala](https://github.com/kamil26300)
