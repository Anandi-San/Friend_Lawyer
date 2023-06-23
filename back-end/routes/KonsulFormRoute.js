import express from "express";
import {
    getKonsulForm,
    getKonsulFormById,
    getnotifByUserId,
    getKonsulFormByLawyerId,
    createKonsulForm,
    updateKonsulForm,
    deleteKonsulForm,
} from "../controllers/KonsulFormController.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/form',verifyUser, getKonsulForm);
router.get('/form/:id',verifyUser, getKonsulFormById);
router.get('/notif/:userId', verifyUser, getnotifByUserId);
router.get('/booking/:userId', verifyUser, getKonsulFormByLawyerId);
router.post('/booking/:userId',verifyUser, createKonsulForm);
router.patch('/form/:id',verifyUser, updateKonsulForm);
router.delete('/form/:id',verifyUser,AdminorpartnersOnly, deleteKonsulForm);

export default router;

