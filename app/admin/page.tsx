"use client";

export default function AdminPage() {
  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
