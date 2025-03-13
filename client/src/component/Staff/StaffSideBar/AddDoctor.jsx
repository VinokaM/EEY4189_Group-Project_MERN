import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./adddoc.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "patient", 
	  });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			
			console.log(res.message);

			toast.success('User Created successfully!', {
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
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
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
			}
		}
	};

	return (
		 <div className="doctor_container">
			<div className="doctor_form_container">
				
				<div className="doctor_right">
					<form className="" onSubmit={handleSubmit}>
						<h1 className="doctor_head">Create User's Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="doctor_input"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="doctor_input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="doctor_input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="doctor_input"
						/>
						<select
  							name="role"
  							onChange={handleChange}
  							value={data.role}
  							className="doctor_input">

  								<option value="patient">Patient</option>
  								<option value="doctor">Doctor</option>
  								
						</select>
						{error && <div className="doctor_error_msg">{error}</div>}
						<button type="submit" className="doctor_green_btn">
							Create User
						</button>
					</form>
					<ToastContainer />
				</div>
			</div>
		 </div>
	);
};

export default Signup;
