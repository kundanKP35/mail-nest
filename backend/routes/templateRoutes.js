import expres from 'express';
const router = expres.Router();
import {getAllTemplates, getTemplateById, getUserTemplates, createTemplate} from '../controllers/templateController.js';
import {protectedRoute} from '../middleware/authMiddleware.js';

router.route('/templates').get(getAllTemplates);
router.route('/templates/me').get(protectedRoute, getUserTemplates).post(protectedRoute, createTemplate);

export default router;