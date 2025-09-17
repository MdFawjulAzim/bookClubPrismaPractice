// src/components/BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function BookCard({ book }) {
  const avgRating = book.reviews?.length
    ? (book.reviews.reduce((s, r) => s + r.rating, 0) / book.reviews.length).toFixed(1)
    : "—";

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between border hover:shadow-xl transition">
      <div>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {book.genres?.map((g) => (
            <span key={g.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{g.name}</span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500" />
          <span className="font-medium">{avgRating}</span>
        </div>
        <span className="text-xs text-gray-400">{dayjs(book.createdAt).fromNow()}</span>
      </div>
      <Link
        to={`/books/${book.id}`}
        className="mt-3 block text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
      >
        View
      </Link>
    </div>
  );
}
