// // import React, { useContext } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import * as yup from 'yup';
// // import axios from '../api/axios';
// // import { AuthContext } from '../context/AuthContext';

// // const schema = yup.object().shape({
// //   email: yup.string().email().required(),
// //   password: yup.string().required(),
// // });

// // const Login = () => {
// //   const { login } = useContext(AuthContext);
// //   const { register, handleSubmit, formState: { errors } } = useForm({
// //     resolver: yupResolver(schema),
// //   });

// //   const onSubmit = async (data) => {
// //     try {
// //       const res = await axios.post('/auth/login', data);
// //       login(res.data.token);
// //       alert('Login successful');
// //     } catch (err) {
// //       alert(err.response?.data?.errors[0].msg || 'Login failed');
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
// //       <h2 className="text-xl font-bold mb-4">Login</h2>
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

// //         <div>
// //           <label>Email</label>
// //           <input {...register('email')} className="w-full p-2 border" />
// //           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
// //         </div>

// //         <div>
// //           <label>Password</label>
// //           <input type="password" {...register('password')} className="w-full p-2 border" />
// //           {errors.password && <p className="text-red-500">{errors.password.message}</p>}
// //         </div>

// //         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;




// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import axios from '../api/axios';
// import { AuthContext } from '../context/AuthContext';

// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post('/auth/login', data);
//       // login(res.data.token);

//       login(res.data.token);
// localStorage.setItem('userId', res.data.user.id);

//       alert('Login successful');
//     } catch (err) {
//       alert(err.response?.data?.errors[0]?.msg || 'Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
//       <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Email</label>
//             <input 
//               {...register('email')} 
//               type="email"
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? "border-red-500" : "border-gray-300"}`} 
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Password</label>
//             <input 
//               type="password" 
//               {...register('password')} 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.password ? "border-red-500" : "border-gray-300"}`} 
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-[1.02]"
//           >
//             Login
//           </button>
//         </form>

//         {/* Extra */}
//         <p className="mt-5 text-center text-sm text-gray-500">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-green-500 hover:underline">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";

// ✅ Form validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      login(res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      alert("✅ Login successful");
    } catch (err) {
      alert(err.response?.data?.errors[0]?.msg || "❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4  bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-lg border border-white/20 animate-fadeIn">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-sm">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-700 mt-2 mb-8 text-sm">
          Please sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <div className={`flex items-center px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} bg-white/50 backdrop-blur-sm shadow-sm focus-within:ring-2 focus-within:ring-green-400`}>
              <Mail className="text-gray-500 mr-3" size={18} />
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className={`flex items-center px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} bg-white/50 backdrop-blur-sm shadow-sm focus-within:ring-2 focus-within:ring-green-400`}>
              <Lock className="text-gray-500 mr-3" size={18} />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

