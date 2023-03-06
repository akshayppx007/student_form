const express = require("express");
const { createForm, getForm, deleteForm, updateForm, getAllForm, forms } = require("../controllers/formController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const methodOverride = require("method-override");

const router = express.Router();

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));




router.route("/create").post(isAuthenticatedUser, createForm);
router.route("/find/:id").get(isAuthenticatedUser,getForm);
router.route("/find/:id/delete").delete(isAuthenticatedUser, deleteForm);
router.route("/find/:id/update").put(isAuthenticatedUser, updateForm);
router.route("/find").get(isAuthenticatedUser,getAllForm);
router.route("/forms").get(isAuthenticatedUser, forms);


module.exports = router;
