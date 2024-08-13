import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Scheduler from "./components/Scheduler/Scheduler";
import SchedulerWithColorPicker from "./components/SchedulerColorPicker/SchedulerColorPicker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Scheduler></Scheduler>
      <SchedulerWithColorPicker />
    </>
  );
}

export default App;
