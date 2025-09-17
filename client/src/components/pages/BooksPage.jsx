// src/pages/BooksPage.jsx
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Books</h1>
        <Link
          to="/books/new"
          className="btn flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Book
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Search by genre"
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
        <p>Loading books...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading books</p>
      ) : displayBooks?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}
    </div>
  );
}
