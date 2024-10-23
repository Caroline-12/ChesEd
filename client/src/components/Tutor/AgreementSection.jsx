import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "@/api/axios";
import { toast } from "sonner";

const AgreementSection = ({ lesson, auth, onAgreementComplete }) => {
  const [proposedPrice, setProposedPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitProposal = async () => {
    if (!proposedPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `/lessons/${lesson._id}/tutor-proposal`,
        {
          price: parseFloat(proposedPrice),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Proposal submitted successfully!");
      onAgreementComplete(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToProposal = async (accepted) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/lessons/${lesson._id}/student-response`,
        { accepted },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      toast.success(accepted ? "Agreement accepted!" : "Agreement rejected");
      onAgreementComplete(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to respond to proposal"
      );
    } finally {
      setLoading(false);
    }
  };

  // Show different content based on user role and agreement status
  const renderContent = () => {
    const isTutor = auth.roles.includes(1984);
    const isStudent = auth.roles.includes(2001);
    const agreement = lesson.agreement || {};

    if (isTutor) {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Submit Price Proposal</h4>
          <div>
            <Label htmlFor="price">Proposed Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={proposedPrice}
              onChange={(e) => setProposedPrice(e.target.value)}
              placeholder="Enter proposed price"
              className="mt-1"
            />
          </div>
          <Button
            onClick={handleSubmitProposal}
            disabled={loading}
            className="w-full"
          >
            Submit Proposal
          </Button>
        </div>
      );
    }

    if (isStudent && agreement.status === "pending") {
      return (
        <div className="space-y-4">
          <Alert>
            <AlertTitle>New Price Proposal</AlertTitle>
            <AlertDescription>
              <p className="mt-2">
                Proposed Price: ${agreement.tutorProposal?.price}
              </p>
            </AlertDescription>
          </Alert>
          <div className="flex gap-4">
            <Button
              onClick={() => handleRespondToProposal(true)}
              disabled={loading}
              className="flex-1"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleRespondToProposal(false)}
              disabled={loading}
              variant="destructive"
              className="flex-1"
            >
              Reject
            </Button>
          </div>
        </div>
      );
    }

    if (agreement.status === "accepted") {
      return (
        <Alert>
          <AlertTitle>Agreement Completed</AlertTitle>
          <AlertDescription>
            <p className="mt-2">
              Agreed Price: ${agreement.tutorProposal?.price}
            </p>
            <p className="mt-2">
              Status: <Badge variant="success">Accepted</Badge>
            </p>
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
        Lesson Agreement
      </h3>
      {renderContent()}
    </section>
  );
};

export default AgreementSection;
