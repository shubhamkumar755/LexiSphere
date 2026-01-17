import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getRecommendedUsers,getMyfriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests} from "../controllers/user.controller.js"

const router=express.Router();

// apply auth middleware to all routes below
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyfriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendRequests);

export default router;