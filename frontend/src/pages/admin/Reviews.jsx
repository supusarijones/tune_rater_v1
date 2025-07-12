// File: frontend/src/pages/admin/Reviews.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export default function ModerateReviews() {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/api/reviews/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.delete(`/api/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReviews(reviews.filter((r) => r._id !== id));
  };

  const handleEdit = (review) => {
    setEditing(review._id);
    setUpdatedContent(review.text || "");
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.put(
      `/api/reviews/${id}`,
      { text: updatedContent },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setReviews(
      reviews.map((r) =>
        r._id === id ? { ...r, text: updatedContent } : r
      )
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Moderate Reviews</h1>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow"
        >
          <p className="text-sm text-gray-500 mb-1">
            Song: <strong>{review.song?.title || "Unknown"}</strong> by {review.user?.name || "Anon"}
          </p>
          {editing === review._id ? (
            <div className="space-y-2">
              <textarea
                className="w-full p-2 rounded border"
                rows={3}
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <button
                onClick={() => handleUpdate(review._id)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2">{review.text || <em>(no text)</em>}</p>
              <button
                onClick={() => handleEdit(review)}
                className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
