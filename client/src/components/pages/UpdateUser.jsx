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

    if (isLoading) return <p>Loading user...</p>;

    const onSubmit = async (data) => {
        await updateUser({ id, data });
        toast.success("User updated successfully");
    };

    return (
        <div className="max-w-lg mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Update User</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("name", { required: true })} placeholder="Name" className="input w-full" />
                <input {...register("email", { required: true })} placeholder="Email" className="input w-full" />
                <button
                    type="submit"
                    className="btn bg-primary text-white w-full"
                    disabled={updating}
                >
                    {updating ? "Updating..." : "Update User"}
                </button>
            </form>
        </div>
    );
}
