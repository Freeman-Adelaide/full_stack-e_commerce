import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controller/orderController.js';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const orderRouter = express.Router();

//user
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("verify", verifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrders)

//admin
orderRouter.get('/list', adminAuthMiddleware, listOrders)
orderRouter.post('/status', adminAuthMiddleware, updateStatus)

export default orderRouter;