import React, { useState } from "react";

export default function ExpertAvailabilityScheduler() {
  const [availability, setAvailability] = useState({});

  function handleChange(e) {
    setAvailability((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <h2>Availability Scheduler</h2>
      <label htmlFor="start-date">Start Date and Time</label>
      <input name="start-date" type="datetime-local" onChange={handleChange} />
      <label htmlFor="end-date">End Date and Time</label>
      <input name="end-date" type="datetime-local" onChange={handleChange} />
      <label htmlFor="repeat">Repeat</label>
      <select name="repeat" onChange={handleChange}>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      {console.log(availability)}
      <br />
      <br />
      <br />
      <button>Set Availability</button>
    </>
  );
}
