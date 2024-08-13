import React, { useState } from "react";
import axios from "axios";

export default function AppoinmentBooking() {
  const [appoinment, setAppoinment] = useState({
    Subject: "Appointment Booked",
    Location: "Kasargod",
    StartTime: "2024-08-01T03:30:00.000Z",
    EndTime: "2024-08-01T04:30:00.000Z",
    IsAllDay: false,
    StartTimezone: null,
    EndTimezone: null,
    Description: "Ranjith's Company need",
    RecurrenceRule: null,
    Id: 7,
  });

  function handleChange(e) {
    setAppoinment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    try {
      const response = await axios.get("http://localhost:3001/api/schedule");
      const prevData = response.data;
      const data = [...prevData, appoinment];
      console.log(data);
      await axios.post("http://localhost:3001/api/schedule", data);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving schedule data:", error);
    }
  }
  return (
    <>
      <p>Select Date</p>
      <input type="date" name="date" onChange={handleChange}></input>
      <p>Select Time Slot</p>
      <select name="time" onChange={handleChange}>
        <option value="1">9:00 AM - 9:30 AM</option>
        <option value="2">9:30 AM - 10:00 AM</option>
        <option value="3">10:00 AM - 10:30 AM</option>
        <option value="4">10:30 AM - 11:00 AM</option>
      </select>

      <button onClick={handleSubmit}>Book Appoinment and Pay!</button>

      {appoinment && console.log("Appoinment : ", appoinment)}
    </>
  );
}
