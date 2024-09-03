import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SchedulerWithColorPicker from "./components/SchedulerColorPicker/SchedulerColorPicker";
import UpcomingAppointments from "./components/UpcomingAppointments/UpcomingAppointments ";
import CompletedAppointments from "./components/CompletedAppointments/CompletedAppointments";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Calender from "./components/Calender/Calender";
import CompletedPayments from "./components/Payments/CompletedPayments";
import PendingPayments from "./components/Payments/PendingPayments";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="upcoming-appoinments"
              element={<UpcomingAppointments />}
            ></Route>
            <Route
              path="completed-appoinments"
              element={<CompletedAppointments />}
            ></Route>
            <Route path="/scheduler-colorpicker" element={<Calender />} />
            <Route path="/completed-payments" element={<CompletedPayments />} />
            <Route path="/pending-payments" element={<PendingPayments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
