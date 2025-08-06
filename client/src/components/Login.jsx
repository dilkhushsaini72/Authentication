import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (response.ok) {
      navigate("/");
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
          Login User
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-white block mb-1">Email</label>
            <input
              className="border rounded bg-[#e8f0fe] font-semibold w-full px-3 py-2"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              className="border rounded bg-[#e8f0fe] font-semibold w-full px-3 py-2"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-white font-semibold">
            Don't have an account{" "}
            <Link to={"/register"} className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
