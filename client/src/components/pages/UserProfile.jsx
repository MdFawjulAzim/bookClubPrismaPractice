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
  const currentUserId = 1; // Replace with actual logged-in user ID
  const isFollowing = user?.followers?.some(f => f.followerId === currentUserId);

  if (isLoading)
    return <p className="text-center mt-20 text-gray-600">Loading user...</p>;

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser({ followerId: currentUserId, followingId: parseInt(id) }).unwrap();
        toast.success("Unfollowed successfully");
      } else {
        await followUser({ followerId: currentUserId, followingId: parseInt(id) }).unwrap();
        toast.success("Followed successfully");
      }
    } catch (error) {
      toast.error("Action failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <span className="text-4xl">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-400 mt-1">
              Followers: {user.followersCount} | Following: {user.followingCount}
            </p>
          </div>
        </div>

        <button
          onClick={handleFollow}
          className={`px-6 py-3 rounded-xl shadow-lg font-semibold transition hover:shadow-xl ${isFollowing ? "bg-gray-300 text-black hover:bg-gray-400" : "bg-primary text-white hover:bg-primary/90"
            }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      {/* User's Books */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Books</h2>
        {user.books?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
