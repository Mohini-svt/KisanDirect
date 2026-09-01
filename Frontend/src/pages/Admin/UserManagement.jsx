import { useState, useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./UserManagement.css";
{/*import users from "../../data/users";*/ }


function UserManagement() {
  const [users, setUsers] = useState([])
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers =
    selectedRole === "All"
      ? users
      : users.filter((user) => user.role?.toLowerCase() === selectedRole.toLocaleLowerCase());




  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="dashboard-header">
          <h1>User Management</h1>
          <p>Manage farmers and buyers on KisanDirect</p>
        </div>

        <div className="users-table-container">
          <h2>All Users</h2>

          <div className="filter-container">
            <label htmlFor="role">Filter by Role: </label>

            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All">All Users</option>
              <option value="Farmer">Farmers</option>
              <option value="Buyer">Buyers</option>
            </select>
          </div>


          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || user.email.split('@')[0]}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={'status ${user.is_active ? "active" : "inactive"}'}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserManagement;