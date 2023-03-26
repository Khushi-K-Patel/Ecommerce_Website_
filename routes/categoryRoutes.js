import express from "express";
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { categoryController, createCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";
import { deleteCategoryController } from './../controller/categoryController.js';

const router = express.Router();

//routes
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//getAll category
router.get('/get-category', categoryController);


//single catgory
router.get('/single-category/:slug', singleCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;