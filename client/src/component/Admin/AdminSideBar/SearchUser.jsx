import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";  

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((user) =>
    roleFilter === "" || user.role === roleFilter
  );

  return (
    <div className="container">
      <h1 className="titlehead">All Users</h1>
      <div className="search-filter-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by first name or email"
          onChange={handleSearch}
        />
        <select
          className="role-select"
          onChange={handleRoleFilter}
          value={roleFilter}
        >
          <option value="">All Roles</option>
          <option value="patient">patient</option>
          <option value="doctor">doctor</option>
          <option value="staff">staff</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Generate ID Card</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === "staff" && (
                  <button className="pdf-button" onClick={() => downloadPDF(user)}>
                    Download PDF
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
