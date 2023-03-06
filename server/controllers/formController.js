const Form = require("../models/form");
const ErrorHandler = require("../utils/ErrorHandler");
const { tryCatch } = require("../utils/tryCatch");



// form page
exports.forms = async (req, res) => {
    req.body.user = req.user.id;

    const form = await Form.find({user: req.body.user});
    
    res.render("form", {forms:form});

};


// creating form
exports.createForm = async (req, res, next) => {

    req.body.user = req.user.id;

    const pAddress = req.body.permanentAddress;
    const cAddress = req.body.currentAddress;

    const form = await Form.create({
        permanentAddress: pAddress,
        currentAddress: cAddress,
        user: req.body.user
    });

    res.redirect("/api/forms");

};



// get all form
exports.getAllForm = async (req, res , next) => {
    const form = await Form.find()

    res.status(200).json({
        success: true,
        form
    });
};


// find form
exports.getForm = tryCatch(async (req, res, next) => {
    const form = await Form.findById(req.params.id);

    res.render("singleForm", {Form: form});
});


// delete form
exports.deleteForm = tryCatch( async (req, res, next) => {
    let form = await Form.findById(req.params.id);

    if(!form) {
        throw new ErrorHandler("form not found", 400)
    }

    form = await Form.findByIdAndDelete(req.params.id);

    res.redirect("/api/forms");
    
});


// update form
exports.updateForm = tryCatch( async (req, res, next) => {
    let form = await Form.findById(req.params.id);

    if(!form) {
        throw new ErrorHandler("form not found", 400)
    }

    form = await Form.findByIdAndUpdate(req.params.id, {
        permanentAddress: req.body.permanentAddress,
        currentAddress:req.body.currentAddress
    });

    res.redirect("/api/forms");
});


