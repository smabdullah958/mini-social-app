// import React, { useEffect, useState, useContext } from 'react';
// import axios from '../api/axios';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6),
// });



// const Profile = () => {
//   const { token } = useContext(AuthContext);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get('/profile');
//         reset(res.data);
//       } catch (err) {
//         alert('Failed to load profile');
//       }
//     };
//     if(token) fetchProfile();
//   }, [token, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.put('/profile', data);
//       setMessage(res.data.msg);
//       setTimeout(() => {
//       navigate('/'); // Redirect to home after update  
//       }, 2000);
      
//     } catch (err) {
//       setMessage(
//         err.response?.data?.errors ? err.response.data.errors[0].msg : 'Failed to update profile'
//       );
//     }
//   };

//   if(!token) return <p className="text-center mt-10">Please login to view profile.</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">My Profile</h2>
//       {message && <p className="mb-4 text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <div>
//           <label>Username</label>
//           <input {...register('username')} className="w-full p-2 border" />
//           {errors.username && <p className="text-red-500">{errors.username.message}</p>}
//         </div>

//         <div>
//           <label>Email</label>
//           <input {...register('email')} className="w-full p-2 border" />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//         </div>

//         <div>
//           <label>Password (leave blank if no change)</label>
//           <input type="password" {...register('password')} className="w-full p-2 border" />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//         </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;




import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

const Profile = () => {
  const { token } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile");
        reset(res.data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    if (token) fetchProfile();
  }, [token, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/profile", data);
      setMessage(res.data.msg);
      setTimeout(() => {
        navigate("/"); // Redirect to home after update
      }, 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.errors
          ? err.response.data.errors[0].msg
          : "Failed to update profile"
      );
    }
  };

  if (!token)
    return (
      <p className="text-center mt-10 text-gray-600">
        Please login to view profile.
      </p>
    );

  return (
    <div className="bg-gradient-to-br  flex items-center justify-center from-blue-200 via-white to-blue-100 w-full h-[100vh]">
    <div className="max-w-lg mx-auto w-[80%] sm:w-[50%] p-6  rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h2>

      {message && (
        <p className="mb-4 text-green-600 font-medium text-center">{message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            {...register("username")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-gray-500">(leave blank if unchanged)</span>
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition"
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default Profile;
