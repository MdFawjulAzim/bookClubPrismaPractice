import { useCreateUserMutation } from "@/store/services/userApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddUser() {
    const { register, handleSubmit, reset } = useForm();
    const [createUser, { isLoading }] = useCreateUserMutation();

    const onSubmit = async (data) => {
        try {
            await createUser(data).unwrap();
            reset();
            toast.success("User added successfully");
        } catch (error) {
            toast.error("Failed to add user");
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New User</h1>
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
                    disabled={isLoading}
                    className="w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl shadow hover:shadow-md transition"
                >
                    {isLoading ? "Adding..." : "Add User"}
                </button>
            </form>
        </div>
    );
}
