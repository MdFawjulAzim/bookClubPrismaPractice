import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery, useSearchBooksQuery } from "@/store/services/bookApi";
import BookCard from "../component/BookCard";
import { Plus } from "lucide-react";

export default function BooksPage() {
  const [genre, setGenre] = useState("");
  const { data: book, isLoading, isError } = useGetBooksQuery();
  const { data: searchResult, refetch } = useSearchBooksQuery(genre, { skip: !genre });
  const books = book?.data;
  const searchResults = searchResult?.data;

  const displayBooks = genre ? searchResults : books;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Books</h1>
        <Link
          to="/books/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          <Plus size={18} />
          Add Book
        </Link>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Search by genre"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:shadow-md transition"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <p className="text-center text-gray-600 mt-10">Loading books...</p>
      ) : isError ? (
        <p className="text-center text-red-500 mt-10">Error loading books</p>
      ) : displayBooks?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books found.</p>
      )}
    </div>
  );
}
