const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  // Input validation
  if (!followerId || !followingId) {
    return res.status(400).json({
      status: "error",
      message: "followerId and followingId are required",
    });
  }

  if (followerId === followingId) {
    return res.status(400).json({
      status: "error",
      message: "You cannot follow yourself",
    });
  }

  try {
    const follow = await prisma.follows.create({
      data: { followerId, followingId },
    });

    return res.status(201).json({
      status: "success",
      message: "Follow created successfully",
      data: follow,
    });
  } catch (error) {
    console.error(error);

    //  Unique constraint error (already following)
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "You are already following this user",
      });
    }

    //  Foreign key error (invalid user IDs)
    if (error.code === "P2003") {
      return res.status(400).json({
        status: "error",
        message: "Invalid followerId or followingId",
      });
    }

    //  Generic server error
    return res.status(500).json({
      status: "error",
      message: "Failed to follow user",
      error: error.message,
    });
  }
};

exports.getFollowers = async (req, res) => {
  const { userId } = req.params;
  const followers = await prisma.follows.findMany({
    where: { followingId: parseInt(userId) },
    include: { follower: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Followers fetched successfully",
    data: followers,
  });
};

exports.getFollowing = async (req, res) => {
  const { userId } = req.params;
  const following = await prisma.follows.findMany({
    where: { followerId: parseInt(userId) },
    include: { following: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Following fetched successfully",
    data: following,
  });
};

exports.unfollowUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: parseInt(followerId),
          followingId: parseInt(followingId),
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Follow deleted successfully",
    });
  } catch (error) {
    console.error("unfollowUser error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Follow not found",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to delete follow",
      error: error.message,
    });
  }
};
