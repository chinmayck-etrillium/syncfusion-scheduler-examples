import React, { useState } from 'react';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject
} from '@syncfusion/ej2-react-schedule';
import './Scheduler.css'; // Assuming this is where your custom CSS is

const Scheduler = () => {
  const [scheduleData, setScheduleData] = useState([
    {
      Id: 1,
      Subject: 'Available',
      StartTime: new Date(2024, 7, 12, 9, 0),
      EndTime: new Date(2024, 7, 12, 12, 0),
      IsAllDay: false,
    },
    {
      Id: 2,
      Subject: 'Not Available',
      StartTime: new Date(2024, 7, 12, 10, 0), // Unavailable from 10 AM
      EndTime: new Date(2024, 7, 12, 11, 0), // to 11 AM
      IsAllDay: false,
      cssClass: 'unavailable-event' // Custom class for styling
    }
  ]);

  return (
    <ScheduleComponent height='550px' eventSettings={{ dataSource: scheduleData }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Scheduler;
