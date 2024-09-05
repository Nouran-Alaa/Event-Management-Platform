import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventForm from "./pages/EventForm";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">
              Home
            </Link>
            <div className="flex space-x-4">
              <Link to="/create" className="hover:text-gray-300">
                Create Event
              </Link>
              <Link to="/events" className="hover:text-gray-300">
                Events List
              </Link>
            </div>
          </div>
        </nav>

        {/* Routing */}
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center text-2xl mt-8">
                Welcome to the Event Manager
              </h1>
            }
          />
          <Route path="/create" element={<EventForm />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
