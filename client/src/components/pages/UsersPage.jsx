// src/pages/UsersPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Plus } from "lucide-react";
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/services/userApi";
import toast from "react-hot-toast";

export default function UsersPage() {
  const { data: user, isLoading, isError } = useGetUsersQuery();
  const users = user?.data;
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p className="text-center mt-20">Loading users...</p>;
  if (isError) return <p className="text-center mt-20 text-red-500">Error loading users</p>;

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap(); // unwrap() করলে error ধরতে পারবেন
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
        <Link
          to="/users/new"
          className="btn flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add User
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <Link to={`/users/${user.id}`} className="flex items-center gap-4">
              <User size={32} className="text-primary" />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </Link>

            <div className="flex gap-2">
              <Link
                to={`/users/update/${user.id}`}
                className="btn bg-yellow-400 text-white px-3 py-1 rounded-lg"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="btn bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
