const Lesson = require("../../model/Lesson");
const express = require("express");
const Payment = require("../../model/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
const router = express.Router();
const bodyParser = require("body-parser");

require("dotenv").config();

// Middleware to parse the raw body needed for Stripe webhooks
router.use(bodyParser.raw({ type: "application/json" }));

router.post("/create-checkout-session", async (req, res) => {
  const { lessonId } = req.body;

  if (!lessonId) {
    return res.status(400).send({
      error: {
        message: "Lesson ID is required",
      },
    });
  }

  // Assuming you have a function to get the agreed price of a lesson
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res.status(404).send({
      error: {
        message: "Lesson not found",
      },
    });
  }

  const amount = lesson.agreedPrice; // Get the agreed price of the lesson

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: lesson.title,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: { lessonId: lessonId },
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
  });

  res.send({ url: session.url });
});

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

let endpointSecret;

// endpointSecret="whsec_981446e08d250dbec0ed02aa57edae5290ec4b7e7fa6a8a457332ba99a551e92"

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log(`🔔  Webhook received: ${event}`);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
      data = event;
      eventType = event.type;
    } else {
      console.log("endpointSecret is not set");
      console.log(`req.body: ${req.body}`);
      console.log(`req.body.type: ${req.body.type}`);
      data = req.body;
      eventType = req.body.type;
    }

    console.log(`data.object: ${data.object}`);
    // Handle the event
    switch (eventType) {
      case "checkout.session.completed":
        console.log(`data.data.object: ${data.data.object}`);
        console.log(`Session ID: ${data.data.object.id}`);
        const session = data.data.object;
        const lessonId = session.metadata.lessonId;

        console.log(`Checkout session completed: ${session.id}`);
        console.log(`Lesson ID: ${lessonId}`);

        if (!lessonId) {
          console.error("Lesson ID is missing in session metadata");
          return res
            .status(400)
            .send("Lesson ID is missing in session metadata");
        }

        // Proceed to update the lesson payment status
        try {
          const lesson = await Lesson.findById(lessonId);
          if (lesson) {
            lesson.paymentStatus = true;
            await lesson.save();
            console.log(`Lesson ${lessonId} payment status updated to paid`);
          } else {
            console.error(`Lesson ${lessonId} not found`);
          }
        } catch (err) {
          console.error("Error updating lesson payment status:", err);
        }

        break;

      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    res.send().end();
  }
);

module.exports = router;
