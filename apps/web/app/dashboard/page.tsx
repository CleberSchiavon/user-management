"use client";
import isProtectedRoute from "@/lib/hocs/isProtectedRoute";
import { userStore } from "@/store/UserStore";
import React, { useEffect } from "react";
const DashboardPage = () => {
  const {fetchUsers} = userStore()

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers()
    }
    fetchData()
  },[])
  return (
    <div className="flex justify-center items-center py-4 content-center h-full">
      <p>Tabela aqui</p>
    </div>
  );
};

export default isProtectedRoute(DashboardPage);
