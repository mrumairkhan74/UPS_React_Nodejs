import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrAnnounce } from "react-icons/gr";

const Announcement = () => {
  const [announcement, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/announcement/getAnnouncement"
      );
      setAnnouncements(response.data);
    } catch (err) {
      setError("Error fetching announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-10">
        <h1 className="text-center text-4xl mb-2 text-blue-500">Announcement</h1>
      {loading ? (
        <div className="text-center text-blue-500">
          Loading announcements...
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : announcement.length > 0 ? (
        announcement.map((ann) => (
          <div
            className="flex items-start p-6 border rounded mb-4 shadow justify-between"
            key={ann._id}
          >
            <div className="flex items-center">
              <GrAnnounce className="text-3xl text-blue-600 mr-4 mt-1" />
              <div>
                <div className="font-bold text-2xl">{ann.title}</div>
                <div className="text-gray-700 text-[12px]">{ann.message}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {new Date(ann.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No announcements available
        </div>
      )}
    </div>
  );
};

export default Announcement;
