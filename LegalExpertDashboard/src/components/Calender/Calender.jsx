import React, { useState, useRef, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Year,
  Inject,
  ViewsDirective,
  ViewDirective,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdENjWXtdcnJSQ2ZU"
);

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const scheduleObj = useRef(null);

  const onEventRendered = (args) => {
    console.log(args);
    if (args.data.CategoryColor) {
      args.element.style.backgroundColor = args.data.CategoryColor;
      args.element.style.borderColor = args.data.CategoryColor;
    }
  };

  const onActionComplete = (args) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged"
    ) {
      const eventData = {
        ...args.data[0],
        CategoryColor: pickedColor.current,
        IsBlock: isBlockedRef.current,
        MeetLink: meetLink.current.value,
      };

      console.log(eventData);

      if (eventData.IsBlock) {
        eventData.Subject =
          eventData.Subject === "Add title"
            ? "Blocked Appointment"
            : eventData.Subject;
        eventData.CategoryColor = "#e9ecef"; //  blocked with grey color
      }

      const updatedScheduleData = scheduleData.map((event) =>
        event.Id === eventData.Id ? eventData : event
      );

      if (!scheduleData.some((event) => event.Id === eventData.Id)) {
        updatedScheduleData.push(eventData);
      }

      setScheduleData(updatedScheduleData);
      isBlockedRef.current = false;
    }

    const setsScheduleData = async () => {
      try {
        if (scheduleData.length > 0) {
          const response = await axios.post(
            "http://localhost:3001/api/schedule",
            scheduleData
          );
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    setsScheduleData();
  };

  useEffect(() => {
    const getScheduleData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/schedule");
        if (response.status === 200) {
          setScheduleData(response.data);
        } else {
          console.log("Response: ", response);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    getScheduleData();
  }, []);

  return (
    <ScheduleComponent
      ref={scheduleObj}
      width="100%"
      height="650px"
      selectedDate={new Date()}
      eventSettings={{
        dataSource: scheduleData,
        allowEditing: false,
        allowAdding: false,
        allowDeleting: false,
        allowDragAndDrop: false,
        allowResizing: false,
      }}
      eventRendered={onEventRendered}
      actionComplete={onActionComplete}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
        <ViewDirective option="Year" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Year, Agenda]} />
    </ScheduleComponent>
  );
};

export default Calendar;
