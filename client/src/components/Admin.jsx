import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";

const Admin = () => {
  const [responseData, setResponseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResponseData(data); // Handle the data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const token = Cookie.get("token");
  if (!token) {
    window.location.href = "/login"; // Redirect to login if token is not present
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <h2 className="text-center text-xl py-3 uppercase font-bold ">Admin</h2>
      <div className="text-center">{responseData.message}</div>
    </div>
  );
};

export default Admin;
