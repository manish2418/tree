import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyCalendar = ({ events, onEventDrop }) => {
  const [myEvents, setMyEvents] = useState(events);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = myEvents.map((e) =>
      e.id === event.id ? { ...e, start, end } : e
    );
    setMyEvents(updatedEvents);
    onEventDrop(updatedEvents);
  };

  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={myEvents}
      views={["month", "week", "day"]}
      defaultView={Views.MONTH}
      defaultDate={new Date()}
      onEventDrop={handleEventDrop}
      selectable
      onSelectSlot={(slotInfo) => console.log("Selected slot:", slotInfo)}
    />
  );
};

export default MyCalendar;
