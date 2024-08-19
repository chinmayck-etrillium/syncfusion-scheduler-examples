import React, { useState, useRef } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
  Agenda,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

const SchedulerWithColorPicker = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#1aaa55");
  const pickedColor = useRef("#1aaa55");
  const isBlockedRef = useRef(false); // Use ref instead of state

  const scheduleObj = useRef(null);

  const onEventRendered = (args) => {
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
                  value={new Date(props.startTime || props.StartTime)}
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
                  value={new Date(props.endTime || props.EndTime)}
                  className="e-field"
                ></DateTimePickerComponent>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const onActionComplete = (args) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged"
    ) {
      const eventData = {
        ...args.data[0],
        CategoryColor: pickedColor.current,
        IsBlock: isBlockedRef.current, // Use the ref value
      };

      if (eventData.IsBlock) {
        eventData.Subject =
          eventData.Subject === "Add title"
            ? "Blocked Appointment"
            : eventData.Subject;
        eventData.CategoryColor = "#e9ecef"; // Indicate blocked with grey color
      }

      const updatedScheduleData = scheduleData.map((event) =>
        event.Id === eventData.Id ? eventData : event
      );

      if (!scheduleData.some((event) => event.Id === eventData.Id)) {
        updatedScheduleData.push(eventData);
      }

      setScheduleData(updatedScheduleData);
      console.log(updatedScheduleData);
    }
  };

  return (
    <ScheduleComponent
      ref={scheduleObj}
      width="100%"
      height="650px"
      selectedDate={new Date()}
      eventSettings={{ dataSource: scheduleData }}
      eventRendered={onEventRendered}
      editorTemplate={editorTemplate}
      actionComplete={onActionComplete}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
      </ViewsDirective>
      <Inject
        services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
      />
    </ScheduleComponent>
  );
};

export default SchedulerWithColorPicker;
