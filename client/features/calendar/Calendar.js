import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchEventAsync, addEventAsync, deleteEventAsync } from "./eventSlice";
import { id } from "date-fns/locale";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarSchedule = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [deleteEvent, setDeleteEvent] = useState({ id: id, title: "" });
  const dispatch = useDispatch();

  const [allEvents, setAllEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  }, [allEvents]);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
    dispatch(
      addEventAsync({
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      })
    );
  }

  const handleDelete = () => {
    setAllEvents(
      allEvents.filter((event) => event.title !== deleteEvent.title)
    );
    dispatch(deleteEventAsync(deleteEvent.title));
  };

  useEffect(() => {
    dispatch(fetchEventAsync());
  }, [dispatch]);

  const currentDateTime = new Date();
  const filteredEvents = allEvents.filter((event) => {
    const eventEnd = new Date(event.end);
    return eventEnd > currentDateTime;
  });

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />

        <DatePicker
          placeholderText="Start Date and Time"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          timeCaption="Time"
        />
        <DatePicker
          placeholderText="End Date and Time"
          style={{ marginRight: "10px" }}
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          timeCaption="Time"
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add event
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Delete Event"
          style={{ width: "20%", marginRight: "10px" }}
          value={deleteEvent.title}
          onChange={(e) => setDeleteEvent({ title: e.target.value })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleDelete}>
          delete Event
        </button>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </div>
  );
};

export default CalendarSchedule;
