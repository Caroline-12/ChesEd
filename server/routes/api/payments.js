const Lesson = require("../../model/Lesson");
const express = require("express");
const Payment = require("../../model/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).send("Error fetching payments");
  }
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-checkout-session", async (req, res) => {
  console.log("create-checkout-session");
  // const { lessonId } = req.params;

  // if (!lessonId) {
  //   return res.status(400).send({
  //     error: {
  //       message: "Lesson ID is required",
  //     },
  //   });
  // }

  // try {
  //   // Assuming you have a function to get the agreed price of a lesson
  //   const lesson = await Lesson.findById(lessonId);
  //   if (!lesson) {
  //     return res.status(404).send({
  //       error: {
  //         message: "Lesson not found",
  //       },
  //     });
  //   }

  //   const amount = lesson.agreedPrice; // Get the agreed price of the lesson

  //   const paymentIntent = await stripe.paymentIntents.create({
  //     currency: "USD",
  //     amount: amount,
  //     automatic_payment_methods: { enabled: true },
  //   });

  //   // Send publishable key and PaymentIntent details to client
  //   res.send({
  //     clientSecret: paymentIntent.client_secret,
  //   });
  // } catch (e) {
  //   return res.status(400).send({
  //     error: {
  //       message: e.message,
  //     },
  //   });
  // }
  res.json({ message: "Hello" });
});

module.exports = router;
