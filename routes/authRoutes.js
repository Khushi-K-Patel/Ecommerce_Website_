import express from "express";
import { getAllOrdersController, getOrdersController, orderStatusController, registerController, updateProfileController } from '../controller/authController.js';
import { loginController } from "../controller/authController.js";
import { testController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { forgotPasswordController } from "../controller/authController.js";

// router object
const router = express.Router();

// routing
// register || method post
router.post('/register', registerController)

// login || method post
router.post('/login', loginController);

//forgot password 
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController);


//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    })
})


//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get('/all-orders', requireSignIn, getAllOrdersController);

//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;