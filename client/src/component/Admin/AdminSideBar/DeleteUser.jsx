import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './delete.css'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:8080/users/${id}`);
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User Deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error('Cannot delete user', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Failed to delete user:", error);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <h1 className="header-title">User Management</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search by email"
        onChange={handleSearch}
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "admin" && (
                  <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                )}
                <ToastContainer />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
