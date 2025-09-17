import React from "react";
import { useGetFeedQuery } from "@/store/services/userApi";
import BookCard from "../component/BookCard";

export default function FeedPage() {
  const currentUserId = 1; // replace with auth user
  const { data: book, isLoading, isError } = useGetFeedQuery(currentUserId);
  const books = book?.data;

  if (isLoading)
    return (
      <div className="text-center mt-20 text-gray-700 font-medium">
        Loading feed...
      </div>
    );
  if (isError)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">
        Error loading feed
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Your Feed
      </h1>

      {books?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No books in your feed. Follow users to see their books.
        </p>
      )}
    </div>
  );
}
