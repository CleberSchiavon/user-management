"use client";
import isProtectedRoute from "@/lib/hocs/isProtectedRoute";
import React from "react";
const DashboardPage = () => {
  return (
    <div className="flex justify-center items-center py-4 content-center h-full">
      <p>Tabela aqui</p>
    </div>
  );
};

export default isProtectedRoute(DashboardPage);
