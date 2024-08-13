import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import axios from "axios";

interface ScheduleEvent {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  StartTimezone: string | null;
  EndTimezone: string | null;
  RecurrenceRule: string;
  [key: string]: any; // Include any other properties your events might have
}

registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdENjWXtdcnJSQ2ZU"
);

export const Scheduler: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    async function fetchDatas() {
      try {
        const resp = await axios.get("http://localhost:3001/api/schedule");

        console.log("resp.data[1]: ", resp.data[1]);
        const datas = resp.data;

        // Convert the array of objects to ScheduleEvent type
        const scheduleEvents: ScheduleEvent[] = datas.map((data: any) => ({
          ...data,
          StartTime: new Date(data.StartTime),
          EndTime: new Date(data.EndTime),
        }));

        setScheduleData(scheduleEvents);
        console.log(scheduleEvents);
      } catch (err) {
        console.log("Error fetching schedule data:", err);
      }
    }

    fetchDatas();
  }, []);

  const saveData = async (data: ScheduleEvent[]) => {
    try {
      await axios.post("http://localhost:3001/api/schedule", data);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving schedule data:", error);
    }
  };

  const onActionComplete = (args) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged" ||
      args.requestType === "eventRemoved"
    ) {
      let updatedData = [...scheduleData];

      if (args.requestType === "eventCreated") {
        // Check if the event already exists
        const exists = updatedData.some(
          (event) => event.Id === args.data[0].Id
        );
        if (!exists) {
          updatedData.push(args.data[0] as ScheduleEvent);
        }
      } else if (args.requestType === "eventChanged") {
        const index = updatedData.findIndex(
          (event) => event.Id === (args.data[0] as ScheduleEvent).Id
        );
        if (index !== -1) {
          updatedData[index] = args.data[0] as ScheduleEvent;
        }
      } else if (args.requestType === "eventRemoved") {
        const index = updatedData.findIndex(
          (event) => event.Id === (args.data[0] as ScheduleEvent).Id
        );
        if (index !== -1) {
          updatedData.splice(index, 1);
        }
      }

      // Update state and save to backend
      setScheduleData(updatedData);
      saveData(updatedData);
    }
  };

  return (
    <>
      <ScheduleComponent
        height="550px"
        selectedDate={new Date(2024, 7, 1)}
        eventSettings={{ dataSource: scheduleData }}
        actionComplete={onActionComplete}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </>
  );
};
