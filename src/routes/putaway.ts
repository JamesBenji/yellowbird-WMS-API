import { Router } from "express";
import { handleDeletePutAwayById, handleGetPutAwayById, handleSavePutAway, handleUpdatePutAwayById } from "../handlers/putaway.handlers";

const router = Router();

router.post("/save", handleSavePutAway);
router.get("/read", handleGetPutAwayById);
router.post("/update", handleUpdatePutAwayById);
router.get("/delete", handleDeletePutAwayById);

export default router;
