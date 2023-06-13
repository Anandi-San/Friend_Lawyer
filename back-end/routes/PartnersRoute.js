import express from "express";
import {
    getPartners,
    getPartnersById,
    createPartners,
    updatePartners,
    deletePartners
} from "../controllers/Partners.js";
import { verifyUser, adminOnly,AdminorpartnersOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/partners',verifyUser, getPartners);
router.get('/partners/:id',verifyUser, getPartnersById);
router.post('/partners',verifyUser,adminOnly, createPartners);
router.patch('/partners/:id',verifyUser,adminOnly, updatePartners);
router.delete('/partners/:id',verifyUser,adminOnly, deletePartners);

export default router;

