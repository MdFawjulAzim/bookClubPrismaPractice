import { useCreateBookMutation } from "@/store/services/bookApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddBook() {
  const { register, handleSubmit, reset } = useForm();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit = async (data) => {
     await createBook({
      title: data.title,
      author: data.author,
      userId: Number(data.userId),
      genreIds: data.genreIds?.split(",").map((g) => Number(g.trim())) || [],
    });
    reset();
    toast.success("Book added successfully");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} placeholder="Title" className="input w-full" />
        <input {...register("author", { required: true })} placeholder="Author" className="input w-full" />
        <input {...register("userId", { required: true })} placeholder="Owner User ID" className="input w-full" />
        <input {...register("genreIds")} placeholder="Genre IDs (comma separated)" className="input w-full" />
        <button
          type="submit"
          className="btn bg-primary text-white w-full"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
