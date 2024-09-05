import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const selectedEvent = storedEvents[parseInt(id, 10)];

    if (selectedEvent) {
      setEvent(selectedEvent);
    } else {
      // Navigate back to the events list if the event is not found
      navigate("/");
    }
  }, [id, navigate]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{event.name}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Date:</span> {event.date}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Location:</span> {event.location}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Description:</span> {event.description}
      </p>
    </div>
  );
};

export default EventDetails;
