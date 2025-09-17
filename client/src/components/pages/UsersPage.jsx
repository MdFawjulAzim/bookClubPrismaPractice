// src/pages/UsersPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useGetUsersQuery } from "@/store/services/userApi";

export default function UsersPage() {
  const { data: user, isLoading, isError } = useGetUsersQuery();
  const users = user?.data;

  if (isLoading) return <p className="text-center mt-20">Loading users...</p>;
  if (isError) return <p className="text-center mt-20 text-red-500">Error loading users</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <User size={32} className="text-primary" />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
