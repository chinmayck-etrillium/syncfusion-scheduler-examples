import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UpcomingAppointments.css"; // Import the CSS file

const UpcomingAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5; // Number of appointments per page

  useEffect(() => {
    async function getAppointments() {
      try {
        const response = await axios.get("http://localhost:3001/api/schedule");
        const appointments = response.data;

        // Get current date and time
        const now = new Date();

        // Filter appointments to show only those in the future
        const filteredAppointments = appointments.filter((appointment) => {
          if (!appointment.IsBlock) {
            const startTime = new Date(appointment.StartTime);
            return startTime > now; // Only include future appointments
          }
          return false;
        });

        const sortedAppointments = filteredAppointments.sort(
          (a, b) => new Date(a.StartTime) - new Date(b.StartTime)
        );

        setUpcomingAppointments(sortedAppointments);
      } catch (err) {
        console.log("Error: ", err);
      }
    }

    getAppointments();
  }, []);

  // Calculate current appointments for the page
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = upcomingAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get total number of pages
  const totalPages = Math.ceil(
    upcomingAppointments.length / appointmentsPerPage
  );

  return (
    <div className="upcoming-appointments">
      <h2>Upcoming Appointments</h2>
      {upcomingAppointments.length > 0 ? (
        <>
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Name</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Meet Link</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => {
                const startDate = new Date(appointment.StartTime);
                const endDate = new Date(appointment.EndTime);

                return (
                  <tr
                    key={appointment.Id}
                    style={{ color: appointment.CategoryColor }}
                  >
                    <td>{appointment.Subject}</td>
                    <td>{appointment.Name}</td>
                    <td>{startDate.toLocaleDateString()}</td>
                    <td>
                      {startDate.toLocaleTimeString()} -{" "}
                      {endDate.toLocaleTimeString()}
                    </td>
                    <td>
                      {appointment.MeetLink ? (
                        <a
                          href={appointment.MeetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Meeting
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default UpcomingAppointments;
