import React, { useRef, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import { applyCategoryColor } from "./helper";
import "./Scheduler.css"; // Assuming this is where your custom CSS is

registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdENjWXtdcnJSQ2ZU"
);

const Scheduler = () => {
  const scheduleObj = useRef(null);
  const [scheduleData, setScheduleData] = useState([
    {
      Id: 1,
      Subject: "Team Meeting",
      StartTime: new Date(2024, 7, 12, 9, 0),
      EndTime: new Date(2024, 7, 12, 10, 0),
      Location: "Conference Room",
      Description: "Discuss project updates",
      CategoryColor: "#1aaa55",
    },
    {
      Id: 2,
      Subject: "Client Call",
      StartTime: new Date(2024, 7, 12, 11, 0),
      EndTime: new Date(2024, 7, 12, 12, 0),
      Location: "Zoom",
      Description: "Review contract details",
      CategoryColor: "#65fbcf",
    },
  ]);
  const onEventRendered = (args) => {
    applyCategoryColor(args, scheduleObj.current.currentView);
  };
  const eventTemplate = (props) => {
    return <div className="custom-event">{props.Subject}</div>;
  };
  return (
    <ScheduleComponent
      height="550px"
      selectedDate={new Date(2024, 7, 12)}
      ref={scheduleObj}
      eventSettings={{
        dataSource: scheduleData,
      }}
      eventRendered={onEventRendered}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective
          option="Month"
          eventTemplate={eventTemplate.bind(this)}
        />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Scheduler;
