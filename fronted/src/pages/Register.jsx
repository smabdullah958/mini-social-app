


import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);
      login(res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.errors[0]?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mt-1 mb-6">Join us and get started today</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-blue-400 ${errors.username ? "border-red-500" : "border-gray-300"}`}>
              <User className="text-gray-400 mr-2" size={18} />
              <input
                {...register("username")}
                placeholder="Enter your username"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}>
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 bg-white/60 focus-within:ring-2 focus-within:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}>
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                {showPassword ? <EyeOff className="text-gray-400" size={18} /> : <Eye className="text-gray-400" size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Extra */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
