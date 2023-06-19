import express from "express";
import {
    getKonsulForm,
    getKonsulFormById,
    getnotifByUserId,
    createKonsulForm,
    updateKonsulForm,
    deleteKonsulForm,
} from "../controllers/KonsulFormController.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/form',verifyUser, getKonsulForm);
router.get('/form/:id',verifyUser,AdminorpartnersOnly, getKonsulFormById);
router.get('/notif/:userId', verifyUser, getnotifByUserId);
router.post('/booking/:userId',verifyUser, createKonsulForm);
router.patch('/form/:id',verifyUser, updateKonsulForm);
router.delete('/form/:id',verifyUser,AdminorpartnersOnly, deleteKonsulForm);

export default router;

