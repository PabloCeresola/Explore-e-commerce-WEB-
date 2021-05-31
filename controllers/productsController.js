const Product = require("../models/Product")
const cloudinary = require('cloudinary').v2

const getAllProducts = async (req, res) => {
    try {
        const result = await Product.find()
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Product.findById(id)
        console.log(result)
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const postProduct = async (req, res) => {

    if (req.files) {
        req.body = JSON.parse(req.body.form)

        const { url } = await cloudinary.uploader.upload(req.files.img.tempFilePath, { folder: "products" })
        req.body.coverImage = url
    }

    try {
        const result = await new Product(req.body).save()
        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const result = await Product.findByIdAndDelete(id)
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        const result = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const editCategory = async (req, res) => {

    let idProduct = req.params.idProduct;

    const { action, idCategory, newNameCategory } = req.body;
    let querySelector, updateOperator;

    switch (action) {
        case "add":
            querySelector = { _id: idProduct };
            updateOperator = { $push: { categories: { name: newNameCategory } } };
            break;
        case "update":
            querySelector = { _id: idProduct, "categories._id": idCategory }
            updateOperator = { $set: { "categories.$.name": newNameCategory } };
            break;
        case "delete":
            querySelector = { _id: idProduct };
            updateOperator = { $pull: { categories: { _id: idCategory } } };
            break;
        default:
            respondFrontend(res, response, `error, unknown action: "${action} "`);
            break;
    }
    try {
        let result = await Product.findOneAndUpdate(querySelector, updateOperator, { new: true });
        res.json({ success: true, result })
    } catch {
        res.json({ success: false, err: 'An error has occurred on our server' })
    }
}

const imagesActions = async (req, res) => {

    let idProduct = req.params.idProduct;
    const { action, idPhoto, newNamePhoto } = req.body;
    let querySelector, updateOperator;
    switch (action) {
        case "add":
            querySelector = { _id: idProduct };
            updateOperator = { $push: { productsImages: { photo: newNamePhoto } } };
            break;
        case "delete":
            querySelector = { _id: idProduct };
            updateOperator = { $pull: { productsImages: { _id: idPhoto } } };
            break;
        default:
            respondFrontend(res, response, `error, unknown action: "${action} "`);
            break;
    }
    try {
        let result = await Product.findOneAndUpdate(querySelector, updateOperator, { new: true });
        res.json({ success: true, result })
    } catch {
        res.json({ success: false, err: 'An error has occurred on our server' })
    }
}


/*---------------- Comments ----------------------- */
const postComment = async (req, res) => {
    const { idProduct } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $push: { comments: req.body } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const deleteComment = async (req, res) => {
    const { idProduct, idComment } = req.params
    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $pull: { comments: { _id: idComment } } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const putComment = async (req, res) => {
    const { idProduct, idComment } = req.params
    const { comment } = req.body
    try {
        const result = await Product.findOneAndUpdate({ "_id": idProduct, "comments._id": idComment }, { $set: { "comments.$.comment": comment } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
/* -------------------Score----------------------------------------------------- */
const postScore = async (req, res) => {
    const { idProduct } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $push: { scores: req.body } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const deleteScore = async (req, res) => {
    const { idProduct, idScore } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $pull: { scores: { _id: idScore } } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const putScore = async (req, res) => {
    const { idProduct, idScore } = req.params
    const { score } = req.body

    try {
        const result = await Product.findOneAndUpdate({ "_id": idProduct, "scores._id": idScore }, { $set: { "scores.$.score": score } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
/* ---------------Categories ----------------- */
const postCategories = async (req, res) => {
    const { idProduct } = req.params
    const { name } = req.body

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $push: { categories: req.body } }, { new: true })
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const deleteCategories = async (req, res) => {
    const { idProduct, idCategory } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $pull: { categories: { _id: idCategory } } }, { new: true })
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const putCategories = async (req, res) => {
    const { idProduct, idCategory } = req.params
    const { name } = req.body

    try {
        const result = await Product.findOneAndUpdate({ "_id": idProduct, "categories._id": idCategory }, { $set: { "categories.$.name": name } }, { new: true })
        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

/* --------------------------------------------------------------- */
cloudinary.config({
    cloud_name: 'dvh9yxfgi',
    api_key: '547514222417516',
    api_secret: 'FnGih22hdSCaHVD-4ebA5e-CVhk'
})

const pruebaHosteo = async (req, res) => {

    const { url } = await cloudinary.uploader.upload(req.files.img.tempFilePath, { width: 100, height: 100, gravity: "faces", crop: "thumb" })


    console.log(url, "poner en la base de datos")

}



module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct,
    postComment,
    deleteComment,
    putComment,
    postScore,
    deleteScore,
    putScore,
    postCategories,
    deleteCategories,
    putCategories,
    editCategory,
    imagesActions
}