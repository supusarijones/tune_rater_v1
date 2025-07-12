import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/songs" className="hover:text-blue-400">Manage Songs</Link>
          <Link to="/admin/users" className="hover:text-blue-400">Manage Users</Link>
          <Link to="/admin/reviews" className="hover:text-blue-400">Moderate Reviews</Link>
          <Link to="/admin/fields" className="hover:text-blue-400">Rating Fields</Link>
          <Link to="/admin/analytics" className="hover:text-blue-400">Analytics</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}
