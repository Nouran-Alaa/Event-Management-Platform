import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);

    const storedRegisteredEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setRegisteredEvents(storedRegisteredEvents);
  }, []);

  const handleClick = (index) => {
    const updatedRegisteredEvents = [...registeredEvents];
    if (updatedRegisteredEvents.includes(index)) {
      const eventIndex = updatedRegisteredEvents.indexOf(index);
      updatedRegisteredEvents.splice(eventIndex, 1);
    } else {
      updatedRegisteredEvents.push(index);
    }
    setRegisteredEvents(updatedRegisteredEvents);
    localStorage.setItem(
      "registeredEvents",
      JSON.stringify(updatedRegisteredEvents)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events yet.</p>
      ) : (
        events.map((event, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-purple-600 mb-2">
              <Link to={`/event/${index}`}>{event.name}</Link>
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Date:</span> {event.date}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Description:</span>{" "}
              {event.description}
            </p>
            <button
              className={`${
                registeredEvents.includes(index)
                  ? "bg-green-500"
                  : "bg-purple-500 hover:bg-purple-400"
              } rounded-[5px] font-bold text-white w-32 py-2  transition duration-200`}
              onClick={() => handleClick(index)}
            >
              {registeredEvents.includes(index) ? "Registered 😄" : "Register"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EventsList;
