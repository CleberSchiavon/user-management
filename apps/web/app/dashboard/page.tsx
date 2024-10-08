"use client";
import isProtectedRoute from "@/lib/hocs/isProtectedRoute";
import React from "react";
const DashboardPage = () => {
  return <div>DashboardPage</div>;
};

export default isProtectedRoute(DashboardPage);
