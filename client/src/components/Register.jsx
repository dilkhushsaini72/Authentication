import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (response.ok) {
      navigate("/login");
      toast.success(result.message);
    }
  };

  const token = Cookie.get("token");
  if (token) {
    window.location.href = "/"; // Redirect to home if token is present
  }

  return (
    <div className="h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <div className="bg-zinc-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-center mb-6 text-2xl text-white font-semibold">
          Register for New User
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-white block mb-1">Username</label>
            <input
              className="text-white border rounded font-semibold w-full px-3 py-2"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-white block mb-1">Email</label>
            <input
              className="text-white border rounded font-semibold w-full px-3 py-2"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-white block mb-1">Password</label>
            <input
              className="text-white border rounded font-semibold w-full px-3 py-2"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
          <p className="text-white font-semibold">
            Already have an account{" "}
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
