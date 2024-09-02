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
  Resize,
  DragAndDrop,
  RecurrenceEditorComponent,
} from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdENjWXtdcnJSQ2ZU"
);

const SchedulerWithColorPicker = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const pickedColor = useRef("#1aaa55");
  const isBlockedRef = useRef(false);
  const recurrenceEditorRef = useRef();
  const meetLink = useRef();

  const scheduleObj = useRef(null);

  const onEventRendered = (args) => {
    console.log(args);
    if (args.data.CategoryColor) {
      args.element.style.backgroundColor = args.data.CategoryColor;
      args.element.style.borderColor = args.data.CategoryColor;
    }
  };

  const onColorChange = (args) => {
    // setSelectedColor(args.currentValue.hex);
    pickedColor.current = args.currentValue.hex;
  };

  const editorTemplate = (props) => {
    const handleBlockChange = (e) => {
      isBlockedRef.current = e.target.checked;
    };

    return (
      <div>
        <table className="custom-event-editor" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td className="e-textlabel">Block Appointment</td>
              <td colSpan={4}>
                <input
                  type="checkbox"
                  id="isBlocked"
                  defaultChecked={isBlockedRef.current}
                  onChange={handleBlockChange}
                />
                <label htmlFor="isBlocked">Block this time slot</label>
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Name</td>
              <td colSpan={4}>
                <input
                  id="Name"
                  className="e-field e-input"
                  type="text"
                  name="Name"
                  defaultValue={props.Name || ""}
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Title</td>
              <td colSpan={4}>
                <input
                  id="Subject"
                  className="e-field e-input"
                  type="text"
                  name="Subject"
                  defaultValue={props.Subject || ""}
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Color</td>
              <td colSpan={4}>
                <ColorPickerComponent
                  id="color-picker"
                  value={props.CategoryColor || pickedColor.current}
                  change={onColorChange}
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">From</td>
              <td colSpan={4}>
                <DateTimePickerComponent
                  format="dd/MM/yy hh:mm a"
                  id="StartTime"
                  data-name="StartTime"
                  value={new Date(props.StartTime)}
                  className="e-field"
                ></DateTimePickerComponent>
              </td>
            </tr>

            <tr>
              <td className="e-textlabel">To</td>
              <td colSpan={4}>
                <DateTimePickerComponent
                  format="dd/MM/yy hh:mm a"
                  id="EndTime"
                  data-name="EndTime"
                  value={new Date(props.EndTime)}
                  className="e-field"
                ></DateTimePickerComponent>
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Recurrence</td>
              <td colSpan={4}>
                <RecurrenceEditorComponent
                  id="RecurrenceRule"
                  ref={recurrenceEditorRef}
                  value={props.RecurrenceRule}
                />
              </td>
            </tr>
            <tr>
              <td>Virtual Meet Link</td>
              <td colSpan={4}>
                <input type="text" value={props.MeetLink} ref={meetLink} />
              </td>
            </tr>
          </tbody>
        </table>
        {console.log("Props: ", props)}
      </div>
    );
  };

  function QuickInfoTemplate(props) {
    return (
      <div className="quick-info-popup">
        <div>
          <h4>{props.Subject}</h4>
          <p>{props.Location}</p>
          <p>{props.Description}</p>
          {/* Custom Link */}
          <div>
            <a
              href={props.MeetLink} // Assuming 'CustomLink' is part of your event data
              target="_blank"
              rel="noopener noreferrer"
              className="custom-link"
            >
              Meet Link
            </a>
          </div>
        </div>
      </div>
    );
  }

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
      eventSettings={{ dataSource: scheduleData }}
      eventRendered={onEventRendered}
      editorTemplate={editorTemplate}
      quickInfoTemplates={{
        content: (props) => <QuickInfoTemplate {...props} />,
      }}
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
      <Inject
        services={[
          Day,
          Week,
          WorkWeek,
          Month,
          Year,
          Agenda,
          Resize,
          DragAndDrop,
        ]}
      />
    </ScheduleComponent>
  );
};

export default SchedulerWithColorPicker;
