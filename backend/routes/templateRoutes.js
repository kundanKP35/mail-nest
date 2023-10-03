import expres from 'express';
const router = expres.Router();
import {getAllTemplates, getTemplateById, getUserTemplates, createTemplate, deleteTemplate} from '../controllers/templateController.js';
import {protectedRoute} from '../middleware/authMiddleware.js';

router.route('/templates').get(getAllTemplates);
router.route('/templates/me').get(protectedRoute, getUserTemplates).post(protectedRoute, createTemplate);
router.route('/templates/me/delete').delete(protectedRoute, deleteTemplate);

export default router;