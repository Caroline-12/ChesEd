import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

function PaymentPage() {
  const lessonId = useParams();
  const { agreedPrice } = useParams();
  console.log(lessonId, agreedPrice);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:3500/payments/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3500/payments/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        lessonId,
        agreedPrice,
      }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1
        className="text-3xl font-semibold text-gray-800 text-center mt-6
      "
      >
        Lesson payment
      </h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default PaymentPage;
