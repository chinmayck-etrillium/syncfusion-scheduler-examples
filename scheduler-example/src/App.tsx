import "./App.css";
import AppoinmentBooking from "./components/AppoinmentBooking/AppoinmentBooking";
import ExpertAvailabilityScheduler from "./components/ExpertAvailabilityScheduler/ExpertAvailabilityScheduler";
import {Scheduler}  from "./components/Scheduler/Scheduler";
function App() {
  return (
    <>
      <Scheduler></Scheduler>
      <AppoinmentBooking />
      <ExpertAvailabilityScheduler />
    </>
  );
}

export default App;
