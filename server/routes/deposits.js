const express = require('express');
const { getDepositsUpdates } = require('../services/ethereumService');
const router = express.Router();

// Get all deposits
router.post('/getDeposits', async (req, res) => {
  const deposits = await getDepositsUpdates(req.params.pageKey)  
  res.status(200).json(deposits)
});

module.exports = router;