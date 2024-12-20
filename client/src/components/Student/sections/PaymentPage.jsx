import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "@/api/axios";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const { lessonId } = useParams();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        await axios.patch(`/lessons/${lessonId}/payment-status`, {
          status: "paid",
        });
        toast.success("Payment status updated successfully.");
      } catch (error) {
        toast.error("Failed to update payment status.");
      }
    };

    updatePaymentStatus();
  }, [lessonId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
