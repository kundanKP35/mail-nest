import asyncHandler from "express-async-handler";
import Template from "../models/templateModel.js";

const getAllTemplates = asyncHandler(async (req, res) => {
    try {
        const templates = await Template.find({ isCustom: false });
        res.json(templates);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserTemplates = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const templates = await Template.find({ createdBy: userId });
        res.json(templates);
    } catch (error) {
        throw new Error(error);
    }
});

const createTemplate = asyncHandler(async (req, res) => {
    const { name, description, subject, body } = req.body;
    const userId = req.user._id;
    try {
        const template = await Template.create({
            name,
            description,
            subject,
            body,
            createdBy: userId,
            isCustom: true,
        });
        res.json(template);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteTemplate = asyncHandler(async (req, res) => {
    const templateId = req.params.id;
    try {
        await Template.findByIdAndDelete({ _id: templateId });
        res.json(Template);
    } catch (error) {
        throw new Error(error);
    }
});

export { getAllTemplates, getUserTemplates, createTemplate, deleteTemplate };
