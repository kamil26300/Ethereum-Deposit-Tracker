const { Network, Alchemy } = require("alchemy-sdk");
const { createLogger, format, transports } = require("winston");
const {
  BEACON_DEPOSIT_CONTRACT,
  REFRESH_DURATION,
} = require("../constants/Constants");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

// Initialize logger
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "deposit-tracker.log" }),
  ],
});

function getCurrentUTCTimestamp() {
  return new Date().toISOString();
}

const getUpdates = async (deposits) => {
  const currentTimeStamp = getCurrentUTCTimestamp();

  deposits.forEach((deposit) => {
    deposit.newDeposit = false;
  });

  for (let deposit of deposits) {
    const blockTimeStamp = new Date(deposit.metadata.blockTimestamp);
    const timeDifference = currentTimeStamp - blockTimeStamp;

    if (timeDifference < REFRESH_DURATION) {
      deposit.newDeposit = true;
      logger.info(`New transaction tracked: ${deposit.hash}`);
    } else {
      break;
    }
  }

  return { deposits, currentTimeStamp, REFRESH_DURATION };
};

const getDepositsByPage = async (pageKey) => {
  try {
    const deposits = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      toAddress: BEACON_DEPOSIT_CONTRACT,
      order: "desc",
      withMetadata: true,
      excludeZeroValue: true,
      maxCount: "15",
      category: ["external", "internal"],
      pageKey: pageKey || undefined,
    });
    logger.info(`Top 15 Deposits of page ${pageKey || 1} fetched`);
    return deposits.transfers;
  } catch (error) {
    logger.error("Error: ", error);
  }
};

const getDepositsUpdates = async (pageKey) => {
  const deposits = await getDepositsByPage(pageKey);
  updatedDeposits = await getUpdates(deposits);
  return updatedDeposits;
};

module.exports = {
  getDepositsUpdates,
};
