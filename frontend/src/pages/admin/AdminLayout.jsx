<button
  onClick={() => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }}
  className="mt-auto text-red-400 hover:text-red-600"
>
  Logout
</button>
