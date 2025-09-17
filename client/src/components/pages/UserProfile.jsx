// src/pages/UserProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";
import BookCard from "../component/BookCard";
import { useGetUserQuery } from "@/store/services/userApi";
import { useFollowUserMutation, useUnfollowUserMutation } from "@/store/services/followApi";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUserQuery(id);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const user = users?.data;
  const currentUserId = 1; // Replace with actual logged-in user ID from auth
  const isFollowing = user?.followers.some(f => f.followerId === currentUserId);

  if (isLoading) return <p>Loading user...</p>;

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser({ followerId: 1, followingId: parseInt(id) });
      toast.success("Unfollowed successfully");
    } else {
      await followUser({ followerId: 1, followingId: parseInt(id) });
      toast.success("Followed successfully");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-400">Followers: {user.followersCount} | Following: {user.followingCount}</p>
        </div>
        <button
          onClick={handleFollow}
          className={`btn ${isFollowing ? "bg-gray-300 text-black" : "bg-primary text-white"}`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Books</h2>
        {user.books?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No books added yet.</p>
        )}
      </div>
    </div>
  );
}
