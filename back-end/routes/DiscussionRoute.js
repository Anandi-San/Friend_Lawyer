import express from "express";
import {
    getDiscussion,
    getDiscussionById,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion
} from "../controllers/Discussion.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/discussion',verifyUser, getDiscussion);
router.get('/discussion/:id',verifyUser, getDiscussionById);
router.post('/discussion',verifyUser, createDiscussion);
router.patch('/discussion/:id',verifyUser, updateDiscussion);
router.delete('/discussion/:id',verifyUser, deleteDiscussion);

export default router;