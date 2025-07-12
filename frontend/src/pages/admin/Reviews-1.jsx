import { useEffect, useState } from "react";
import axios from "axios";

export default function ModerateReviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get("/api/reviews", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("adminToken");
    await axios.delete(`/api/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReviews();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Moderate Reviews</h1>
      <ul className="space-y-4">
        {reviews.map((rev) => (
          <li key={rev._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="text-sm text-gray-500">{rev.user.name} on <strong>{rev.song.title}</strong></div>
            <div className="text-gray-800 dark:text-gray-200 my-2">{rev.comment}</div>
            <button
              onClick={() => handleDelete(rev._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
