import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

const EventForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Event name is required"),
    date: Yup.date()
      .min(today, "The date cannot be in the past")
      .required("Date is required")
      .nullable(),
    location: Yup.string().required("Location is required"),
    description: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Description is required"),
  });

  const saveEventToLocalStorage = (event) => {
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventWithId = { ...event, id: Date.now().toString() }; // Add unique ID to each event
    const updatedEvents = [...existingEvents, eventWithId];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="pt-8">
      <Formik
        initialValues={{
          name: "",
          date: "",
          location: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          saveEventToLocalStorage(values);
          resetForm(); // Reset form fields after submission
        }}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-bold mb-2"
              >
                Date:
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location:
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description:
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-500 text-white font-bold hover:bg-purple-400 transition duration-200"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;
