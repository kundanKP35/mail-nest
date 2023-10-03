import asyncHandler from 'express-async-handler';
import Template from '../models/templateModel.js';

const getAllTemplates = asyncHandler(async (req, res) => {
   try {
    const templates = await Template.find({isCustom: false});
        res.json(templates);
   } catch (error) {
        throw new Error(error);
   }
});

const getTemplateById = asyncHandler(async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        res.json(template);
    } catch (error) {
        throw new Error(error);
    }       
});

const getUserTemplates = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const templates = await Template.find({createdBy: userId});
        res.json(templates);
    } catch (error) {
        throw new Error(error);
    }
});

const createTemplate = asyncHandler(async (req, res) => {
    const {name, subject, body} = req.body;
    const userId = req.user._id;
    try {
        const template = await Template.create({
            name,
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
    const userId = req.user._id;
    const templateId = req.params.id;
    try {
        const template = await Template.findOneAndDelete({
            _id: templateId,
            createdBy: userId,
            isCustom: true, // Ensure it's a custom template
        });

        if (template) {
            res.json({ message: 'Custom template removed successfully' });
        } else {
            res.status(404).json({ message: 'Custom template not found or you do not have permission to delete' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting custom template' });
    }
});


export {getAllTemplates, getTemplateById, getUserTemplates, createTemplate, deleteTemplate};

