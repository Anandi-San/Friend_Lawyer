import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyUser,AdminorpartnersOnly, getUsers);
router.get('/users/:id',verifyUser,AdminorpartnersOnly, getUserById);
router.post('/users',verifyUser,adminOnly, createUser);
router.patch('/users/:id',verifyUser,adminOnly, updateUser);
router.delete('/users/:id',verifyUser,adminOnly, deleteUser);

export default router;

