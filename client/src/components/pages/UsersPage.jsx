import React from "react";
import { Link } from "react-router-dom";
import { User, Plus } from "lucide-react";
import { useDeleteUserMutation, useGetUsersQuery } from "@/store/services/userApi";
import toast from "react-hot-toast";

export default function UsersPage() {
  const { data: user, isLoading, isError } = useGetUsersQuery();
  const users = user?.data;
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading)
    return <p className="text-center mt-20 text-gray-600">Loading users...</p>;
  if (isError)
    return <p className="text-center mt-20 text-red-500">Error loading users</p>;

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
        <Link
          to="/users/new"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl shadow hover:shadow-md transition font-semibold"
        >
          <Plus size={18} />
          Add User
        </Link>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden hover:scale-[1.02] duration-300"
          >
            {/* Profile Section */}
            <div className="flex items-center p-5 gap-4 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 p-4">
              <Link
                to={`/users/update/${user.id}`}
                className="px-4 py-2 bg-black text-white rounded-xl shadow hover:shadow-lg transition font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-black text-white rounded-xl shadow hover:shadow-lg transition font-medium"
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>

      {!users?.length && (
        <p className="text-center text-gray-500 mt-10">No users found.</p>
      )}
    </div>
  );
}
