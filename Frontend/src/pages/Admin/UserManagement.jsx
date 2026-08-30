import { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./UserManagement.css";
import users from "../../data/users";



function UserManagement() {
const [selectedRole, setSelectedRole] = useState("All");

const filteredUsers =
  selectedRole === "All"
    ? users
    : users.filter((user) => user.role === selectedRole);




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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
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