import { Router } from "express";
import { handleDeleteInspectionById, handleGetInspectionById, handleSaveInspection, handleUpdateInspectionById } from "../handlers/inspection.handler";

const router = Router()

router.post('/save', handleSaveInspection)
router.get('/read', handleGetInspectionById)
router.post('/update', handleUpdateInspectionById)
router.get('/delete', handleDeleteInspectionById)

export default router