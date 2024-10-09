"use client";
import isProtectedRoute from "@/lib/hocs/isProtectedRoute";
import { userStore } from "@/store/UserStore";
import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/DataTable";
import { UsersTableColumns } from "~/components/DataTable/columns/user-columns";

const DashboardPage = () => {
  const { users, fetchUsers } = userStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchTableData = async ({ page, itemsPerPage }) => {
    await fetchUsers(page, itemsPerPage);
  };

  useEffect(() => {
    fetchTableData({ page: currentPage, itemsPerPage });
  }, []);

  const handleNextPage = async () => {
    if (users.meta.hasNextPage) {
      await fetchTableData({
        page: currentPage + 1,
        itemsPerPage: itemsPerPage,
      });
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = async () => {
    if (users.meta.hasPreviousPage) {
      await fetchTableData({
        page: currentPage - 1,
        itemsPerPage: itemsPerPage,
      });
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container h-screen">
      <div className="py-4 flex flex-col gap-4">
        <p className="text-white text-lg">
          Usuários cadastrados ({users.meta.itemCount})
        </p>
        <DataTable
          columns={UsersTableColumns}
          data={users.data}
          paginationMeta={users.meta}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          filterColumn="email"
        />
      </div>
    </div>
  );
};

export default isProtectedRoute(DashboardPage);
