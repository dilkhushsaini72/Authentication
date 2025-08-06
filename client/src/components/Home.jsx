import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const fetchHomeData = async () => {
    try {
      const response = await fetch("/api/home", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch home data");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const logoutHandle = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        Cookie.remove("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const token = Cookie.get("token");

  return (
    <div>
      <h1 className="text-center text-2xl py-4">Welcome to the Home Page</h1>
      {token ? (
        <button
          onClick={logoutHandle}
          className="bg-red-500 absolute right-10 top-5 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 absolute right-10 top-5 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Loggin
        </button>
      )}
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <h2 className="text-6xl font-extrabold">Home</h2>
      </div>
    </div>
  );
};

export default Home;
