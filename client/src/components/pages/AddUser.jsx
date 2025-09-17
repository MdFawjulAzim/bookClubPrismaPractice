import { useCreateUserMutation } from "@/store/services/userApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddUser() {
    const { register, handleSubmit, reset } = useForm();
    const [createUser, { isLoading }] = useCreateUserMutation();

    const onSubmit = async (data) => {
        await createUser(data);
        reset();
        toast.success("User added successfully");
    };

    return (
        <div className="max-w-lg mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Add New User</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("name", { required: true })} placeholder="Name" className="input w-full" />
                <input {...register("email", { required: true })} placeholder="Email" className="input w-full" />
                <button
                    type="submit"
                    className="btn bg-primary text-white w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add User"}
                </button>
            </form>
        </div>
    );
}
