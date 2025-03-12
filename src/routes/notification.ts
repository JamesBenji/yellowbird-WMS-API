import { Router } from "express";
import { handleGetById, handleIncomingStock, handleSearchByDate } from "../handlers/incoming.stock.handler";

const router = Router();

router.post('/incoming', handleIncomingStock)
router.get('/get-by-id', handleGetById)
router.get('/search', handleSearchByDate)


export default router;