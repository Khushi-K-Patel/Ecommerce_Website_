import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModels.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exist",
            })
        }
        const category = await new categoryModels({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New Caategory Created",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        })
    }
}


//update category

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModels.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
}


//getall category
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModels.find({})
        res.status(200).send({
            success: true,
            message: "All category list",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all category"
        })
    }

}

//single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModels.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Single Category"
        })

    }
}


// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModels.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted Scussfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })

    }
}