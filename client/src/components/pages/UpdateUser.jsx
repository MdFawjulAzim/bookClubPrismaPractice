import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetUserQuery, useUpdateUserMutation } from "@/store/services/userApi";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUserQuery(id);
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const { register, handleSubmit, reset } = useForm();
  const user = users?.data;

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email });
  }, [user, reset]);

  if (isLoading)
    return <p className="text-center mt-20 text-gray-600">Loading user...</p>;

  const onSubmit = async (data) => {
    try {
      await updateUser({ id, data }).unwrap();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Update User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <button
          type="submit"
          disabled={updating}
          className="w-full px-5 py-3 bg-black text-white font-semibold rounded-xl shadow hover:shadow-md transition"
        >
          {updating ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
}
