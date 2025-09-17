// src/pages/SearchPage.jsx
import { useSearchBooksQuery } from "@/store/services/bookApi";
import React, { useState } from "react";
import BookCard from "../component/BookCard";

export default function SearchPage() {
  const [genre, setGenre] = useState("");
  const { data: book, refetch, isLoading, isError } = useSearchBooksQuery(genre, { skip: !genre });
  const books = book?.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Books</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre..."
          className="input flex-1"
        />
        <button
          className="btn bg-primary text-white px-4"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <p>Searching...</p>
      ) : isError ? (
        <p className="text-red-500">Error searching books</p>
      ) : books?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : genre ? (
        <p className="text-gray-500">No books found for "{genre}"</p>
      ) : (
        <p className="text-gray-500">Enter a genre to search.</p>
      )}
    </div>
  );
}
