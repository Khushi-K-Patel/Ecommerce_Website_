import express from "express"
import formidable from "express-formidable";
import { brainTreePaymentController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from "../controller/productController.js";
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { braintreeTokenController } from './../controller/productController.js';

const router = express.Router();

//router
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);


//get product
router.get('/get-product', getProductController)


//single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delte product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

// update product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//filter product
router.post('/product-filters', productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)


//similar product
router.get('/related-product/:pid/:cid', realtedProductController)


//category wise product
router.get('/product-category/:slug', productCategoryController)

//payment routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)


export default router; 