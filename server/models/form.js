const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    permanentAddress: {
        type: String
    },
    currentAddress: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Form", formSchema);