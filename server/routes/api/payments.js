const express = require("express");
const Payment = require("../../model/Payment");
const router = express.Router();

router.get("/student/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const payments = await Payment.find({ studentId });
    res.json(payments);
  } catch (err) {
    res.status(500).send("Error fetching payments");
  }
});
// get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).send("Error fetching payments");
  }
});

module.exports = router;
