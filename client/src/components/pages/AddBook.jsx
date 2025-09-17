import { useCreateBookMutation } from "@/store/services/bookApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddBook() {
  const { register, handleSubmit, reset } = useForm();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit = async (data) => {
    try {
      await createBook({
        title: data.title,
        author: data.author,
        userId: Number(data.userId),
        genreIds: data.genreIds?.split(",").map((g) => Number(g.trim())) || [],
      });
      reset();
      toast.success("Book added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <input
          {...register("author", { required: true })}
          placeholder="Author"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <input
          {...register("userId", { required: true })}
          placeholder="Owner User ID"
          type="number"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <input
          {...register("genreIds")}
          placeholder="Genre IDs (comma separated)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl shadow hover:shadow-md transition"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
