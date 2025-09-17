import { useSearchBooksQuery } from "@/store/services/bookApi";
import React, { useState } from "react";
import BookCard from "../component/BookCard";

export default function SearchPage() {
  const [genre, setGenre] = useState("");
  const { data: book, refetch, isLoading, isError } = useSearchBooksQuery(genre, { skip: !genre });
  const books = book?.data;

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Search Books</h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <button
          onClick={() => refetch()}
          className="px-5 py-3 bg-primary text-white rounded-xl shadow hover:shadow-md transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {isLoading ? (
        <p className="text-center text-gray-600 mt-10">Searching...</p>
      ) : isError ? (
        <p className="text-center text-red-500 mt-10">Error searching books</p>
      ) : books?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : genre ? (
        <p className="text-center text-gray-500 mt-10">No books found for "{genre}"</p>
      ) : (
        <p className="text-center text-gray-500 mt-10">Enter a genre to search.</p>
      )}
    </div>
  );
}
