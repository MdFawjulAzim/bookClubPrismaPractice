import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetBookQuery } from "@/store/services/bookApi";
import { useCreateReviewMutation } from "@/store/services/reviewApi";
import ExportBooksPDF from "../component/ExportBooksPDF";
dayjs.extend(relativeTime);

export default function BookDetail() {
  const { id } = useParams();
  const { data: books, isLoading } = useGetBookQuery(id);
  const [createReview] = useCreateReviewMutation();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const book = books?.data;

  if (isLoading) return <p>Loading book...</p>;

  const handleReview = async () => {
    await createReview({ bookId: book.id, content: reviewText, rating, userId: 1 });
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-500">{book.author}</p>
      <p className="text-sm text-gray-400">{dayjs(book.createdAt).fromNow()}</p>

      <ExportBooksPDF books={[book]} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {book.reviews?.length ? (
          <ul className="space-y-2">
            {book.reviews.map((r) => (
              <li key={r.id} className="border rounded p-2">
                <p className="font-medium">Rating: {r.rating} ⭐</p>
                <p>{r.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Add Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="input w-full h-24"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input w-24 mt-2"
        />
        <button
          onClick={handleReview}
          className="btn bg-primary text-white mt-2"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
