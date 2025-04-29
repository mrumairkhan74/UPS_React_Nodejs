import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Announcement from "./Announcement";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation BEFORE sending the request
    if (!title || !message) {
      return setError("All fields are required.");
    }

    setLoading(true);
    setError(null);
    try {
      await axios.post(
        "http://localhost:3000/announcement/createAnnouncement",
        { title, message },
        { withCredentials: true }
      );
      navigate("/createannouncement");
    } catch (err) {
      setError("Something went wrong while creating announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      </div>
      <Announcement />
    </>
  );
};

export default CreateAnnouncement;
