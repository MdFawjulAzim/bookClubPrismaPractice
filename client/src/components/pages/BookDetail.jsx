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

  if (isLoading)
    return <p className="text-center mt-20 text-gray-600">Loading book...</p>;

  const handleReview = async () => {
    if (!reviewText.trim()) return;
    await createReview({
      bookId: book.id,
      comment: reviewText,
      rating,
      userId: 1, // Replace with actual logged-in user ID
    });
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      {/* Book Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
        <p className="text-gray-500 text-lg">{book.author}</p>
        <p className="text-gray-400 text-sm">{dayjs(book.createdAt).fromNow()}</p>
        <div className="mt-4 bg-black text-white px-4 py-2 rounded-xl inline-block">
          <ExportBooksPDF books={[book]} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>

        {book.reviews?.length ? (
          <ul className="space-y-3">
            {book.reviews.map((r) => (
              <li
                key={r.id}
                className="border border-gray-200 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-900">
                    Rating: {r.rating} ⭐
                  </p>
                  <p className="text-gray-400 text-sm">
                    {dayjs(r.createdAt).fromNow()}
                  </p>
                </div>
                {r.user && (
                  <p className="text-gray-700 font-semibold mb-1">
                    {r.user.name}
                  </p>
                )}
                <p className="text-gray-700">{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Add Review */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Add Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
          rows={4}
        />
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-24 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
          <button
            onClick={handleReview}
            className="px-6 py-2 bg-black text-white rounded-xl shadow hover:shadow-md font-medium transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
