import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ScheduleMeeting = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSchedule = async () => {
    try {
      // Call your backend API to schedule the meeting using Google Calendar API
      const response = await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (!response.ok) throw new Error("Failed to schedule meeting");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your meeting has been scheduled successfully!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Schedule Virtual Meeting</CardTitle>
      </CardHeader>
      <CardContent>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <Button onClick={handleSchedule}>Schedule Meeting</Button>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleMeeting;
