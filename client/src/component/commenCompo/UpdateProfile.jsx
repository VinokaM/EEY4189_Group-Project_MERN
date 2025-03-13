import React, { useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./updateForm.css";
//import image from "../../image/curriculum-vitae.png"



const userId = localStorage.getItem("userId");


const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/users/${userId}`;
                const { data } = await axios.get(url);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/users/${userId}`;
            const { data: updatedUser } = await axios.put(url, formData);
            toast.success('Your data updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            console.log("User updated:", updatedUser);
           
        } catch (error) {
            toast.error('cannot update your data', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            console.error("Failed to update user:", error);
            
        }
    };


    return (
        
        <div className="updateForm">
            <h1 className="">Update your Account</h1>

        <form onSubmit={handleSubmit} className="">
            
            <label className="" htmlFor="firstName">First Name:</label>
            <input className=""
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />

            <label className="" htmlFor="lastName">Last Name:</label>
            <input className=""
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />

            <label className="" htmlFor="email">Email:</label>
            <input className=""
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <button className="" type="submit">
               Update
            </button>
            <ToastContainer />
        </form>
        
        
    </div>
    
    );
};

export default UpdateProfile;
