import express from "express";
import {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
} from "../controllers/Message.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/message',verifyUser, getMessages);
router.get('/message/:id',verifyUser, getMessageById);
router.post('/message/:discussionId',verifyUser, createMessage);
router.delete('/message/:id',verifyUser, deleteMessage);

export default router;