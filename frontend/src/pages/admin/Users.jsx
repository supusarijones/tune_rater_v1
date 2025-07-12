import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSuspend = async (userId, currentStatus) => {
    const token = localStorage.getItem("adminToken");
    await axios.put(
      `/api/users/${userId}/suspend`,
      { suspended: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-gray-700 rounded">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b dark:border-gray-600">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.suspended ? (
                    <span className="text-red-500">Suspended</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => toggleSuspend(user._id, user.suspended)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    {user.suspended ? "Unsuspend" : "Suspend"}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
