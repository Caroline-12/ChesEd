import { useEffect, useState } from "react";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentPayments = () => {
  const { auth } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`/payments/student/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to load payments. Please try again later.");
      setLoading(false);
    }
  };

  const handlePayNow = (paymentId) => {
    // Replace with your payment route or logic
    navigate(`/payment/${paymentId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.itemName}</TableCell>
                  <TableCell>{payment.itemType}</TableCell>
                  <TableCell>
                    {payment.status === "Paid" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>
                    {payment.status !== "Paid" && (
                      <Button
                        variant="outline"
                        className="text-red-800 border-red-800 hover:bg-green-200"
                        onClick={() => handlePayNow(payment.id)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPayments;
