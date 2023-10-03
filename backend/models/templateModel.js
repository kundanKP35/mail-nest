import mongoose from "mongoose";

const templateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
});

const Template = mongoose.model("Template", templateSchema);

export default Template;