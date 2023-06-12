import express from "express";
import {
    getKonsulForm,
    getKonsulFormById,
    createKonsulForm,
    updateKonsulForm,
    deleteKonsulForm,
} from "../controllers/KonsulFormController.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/form',verifyUser,AdminorpartnersOnly, getKonsulForm);
router.get('/form/:id',verifyUser,AdminorpartnersOnly, getKonsulFormById);
router.post('/booking/:userId',verifyUser,adminOnly, createKonsulForm);
router.patch('/form/:id',verifyUser,adminOnly, updateKonsulForm);
router.delete('/form/:id',verifyUser,adminOnly, deleteKonsulForm);

export default router;

