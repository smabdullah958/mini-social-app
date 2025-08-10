
// // function App() {

// //   return (
// //     <>
// // this is a app.jsx
// //    </>
// //   )
// // }

// // export default App



// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import { AuthContext, AuthProvider } from './context/AuthContext';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import Profile from './pages/Profile';


// function App() {
//   const { token } = useContext(AuthContext);



//   return (
//     <Router>

// <nav className="bg-gray-800 p-4 text-white flex justify-center space-x-4">
//   <Link to="/" className="hover:underline">Home</Link>
//   {token && <Link to="/profile" className="hover:underline">Profile</Link>}
//   {!token && <>
//     <Link to="/login" className="hover:underline">Login</Link>
//     <Link to="/register" className="hover:underline">Register</Link>
   
//   </>}
// </nav>


//       <Routes>
//         <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
//         <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
//     <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />

//       </Routes>
//     </Router>
//   );
// }

// export default function WrappedApp() {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// }


import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition"
            >
              SocialApp
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Home
              </Link>

              {token && (
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Profile
                </Link>
              )}

              {!token && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
