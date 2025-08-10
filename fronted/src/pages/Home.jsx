

import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";

const postSchema = yup.object().shape({
  content: yup
    .string()
    .required("Content is required")
    .max(280, "Max 280 characters"),
});

const Home = () => {
  const { token, logout } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to fetch posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
    else setLoading(false);
  }, [token]);

  const onSubmit = async (data) => {
    try {
      await axios.post("/posts", data);
      reset();
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.errors?.[0]?.msg || "Failed to create post");
    }
  };

  const currentUserId = localStorage.getItem("userId");

  const handleLike = async (postId, currentStatus) => {
    try {
      if (currentStatus !== "liked") {
        await axios.put(`/LikeAndUnlike/${postId}/like`);
      } else {
        await axios.put(`/LikeAndUnlike/${postId}/unlike`);
      }
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to update reaction");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">Loading posts...</p>
        </div>
      </div>
    );

  if (!token)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 text-xl font-semibold mb-4">
            Please login or register to see posts.
          </p>
          <a
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
          >
            Go to Login
          </a>
        </div>
      </div>
    );

  return (

     <div className="bg-gradient-to-br  from-blue-300 via-white to-blue-200 w-full h-[100%]">

    <div className="max-w-2xl mx-auto pt-10  px-4 sm:px-6 lg:px-8 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          ✨ Social Hub
        </h1>
        <button
          onClick={() => {
            logout();
            setPosts([]);
          }}
          className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:opacity-90 transition shadow-md text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Create Post */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-[1.01] transition">
        <textarea
          {...register("content")}
          placeholder="💬 What's on your mind?"
          className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-2 font-medium">
            {errors.content.message}
          </p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:opacity-90 transition shadow-md text-sm font-medium"
          >
            🚀 Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-medium">No posts yet.</p>
            <p className="text-gray-400 text-sm">Be the first to share something!</p>
          </div>
        )}

        {posts.map((post) => {
          let status = "neutral";
          if (post.likes.some((id) => id.toString() === currentUserId)) {
            status = "liked";
          }

          return (
            <div
              key={post._id}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition transform hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${post.user?.username || "User"}&background=random&size=40`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-base">
                    {post.user?.username || "Unknown"}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="mb-4 text-gray-800 text-base leading-relaxed">
                {post.content}
              </p>

              {/* Reaction buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(post._id, status)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition shadow-sm flex items-center gap-1 ${
                    status === "liked"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <span>👍</span> Like ({post.likes.length})
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Home;