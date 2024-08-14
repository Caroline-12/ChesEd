import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const Payments = () => {
  const { auth } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllPaymentsments();
  }, []);

  const fetchAllPaymentsments = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      const response = await axios.get(`/payments`, config);
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      console.log("Failed to load assignments. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Item Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No payments found.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell className="font-medium">
                    {payment.studentId}
                  </TableCell>
                  <TableCell>{payment.itemName}</TableCell>
                  <TableCell>{payment.itemType}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    ${payment.amount}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Payments;
