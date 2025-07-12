import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function Analytics() {
  const [topRated, setTopRated] = useState([]);
  const [mostReviewed, setMostReviewed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      const res1 = await axios.get("/api/analytics/top-rated", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await axios.get("/api/analytics/most-reviewed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopRated(res1.data);
      setMostReviewed(res2.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Site Analytics</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Top Rated Songs</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topRated} layout="vertical" margin={{ left: 50 }}>
            <XAxis type="number" domain={[0, 5]} />
            <YAxis type="category" dataKey="title" />
            <Tooltip />
            <Bar dataKey="averageRating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Most Reviewed Songs</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mostReviewed}
              dataKey="reviewCount"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {mostReviewed.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
