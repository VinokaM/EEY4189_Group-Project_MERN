import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './calcu.css';

const UserStats = () => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/stats");
        setUserStats(response.data);
        toast.success('Data retrieved successfully!', {
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
        toast.error('Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error fetching user stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {userStats && (
          <div>
            <p className="customer-count">Our all User Count is {userStats.total.count}</p>
            <div className="role-container">
              {Object.keys(userStats).map((role) => {
                if (role !== "total") {
                  return (
                    <div className="role-card" key={role}>
                      <p className="role-card-title">{role}</p>
                      <p className="role-card-stats"><strong>Total Count:</strong> {userStats[role].count}</p>
                      <p className="role-card-stats"><strong>Average:</strong> {(userStats[role].count / userStats.total.count * 100).toFixed(2)}%</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
        <ToastContainer />
      </div>

      <div className="bar-chart-container">
        {userStats && (
          <ResponsiveContainer>
            <BarChart
              data={Object.keys(userStats || {}).map((role) => {
                if (role !== "total") {
                  return { data: role, total: userStats[role].count };
                }
                return null;
              }).filter(Boolean)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default UserStats;
