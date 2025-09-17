import React from "react";
import { useGetFeedQuery } from "@/store/services/userApi";
import BookCard from "../component/BookCard";

export default function FeedPage() {
  const currentUserId = 1; // replace with auth user
  const { data: book, isLoading, isError } = useGetFeedQuery(currentUserId);
  const books=book?.data;

  if (isLoading) return <div className="text-center mt-20">Loading feed...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Error loading feed</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      {books?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No books in your feed. Follow users to see their books.</p>
      )}
    </div>
  );
}
