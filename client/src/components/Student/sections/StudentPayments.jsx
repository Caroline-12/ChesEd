import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment"; // For formatting date and time
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const StudentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  console.log("Student ID:", auth.ID);

  useEffect(() => {
    // Function to fetch paid lessons from the backend API
    const fetchPaidLessons = async () => {
      try {
        const response = await axios.get(`/payments/lessons/${auth.ID}/paid`);
        setPayments(response.data); // Set the fetched data to the state
        setLoading(false);
      } catch (err) {
        setError("Error fetching paid lessons.");
        setLoading(false);
      }
    };

    fetchPaidLessons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(payments);
  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div>No payments found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.title}</TableCell>
                    <TableCell>${payment.agreedPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {moment(payment.timeOfPayment).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell>
                      <FaCheckCircle className="text-green-500" />
                    </TableCell>
                    <TableCell>Stripe</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPayments;
