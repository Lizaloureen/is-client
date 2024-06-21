import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("siToken");

  if (token === "" || token === "undefined") {
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
