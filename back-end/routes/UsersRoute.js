import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserbyUser,
    deleteUser,
    updateProfil
} from "../controllers/Users.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id',verifyUser, getUserById);
router.post('/users', createUser);
router.post('/resetpassword', updateUserbyUser);
router.patch('/users/:id',verifyUser, updateUser);
router.patch('/profil/update/:id', verifyUser, updateProfil)
router.delete('/users/:id',verifyUser,adminOnly, deleteUser);

export default router;

