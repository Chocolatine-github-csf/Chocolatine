const express = require('express');
const controller = require('../controllers/TeacherSkillsController');
const { requireJwtAuth } = require('../middleware');

const router = express.Router();
router.use(requireJwtAuth);

// Get all skills and subjects
router.get('/', requireJwtAuth, controller.getAllSkillsAndSubjects);

// Get skills by subject
router.get('/subject/:subject', requireJwtAuth, controller.getSkillsBySubject);

// Get skills by skill
router.get('/skill/:skill', requireJwtAuth, controller.getSkillsBySkill);

//Get skill by subject and skill
router.get('/:subject/:skill', requireJwtAuth, controller.getSkillsBySubjectAndSkill);

// Create skill with subject and skill
router.post('/createSkill', requireJwtAuth, controller.createSkill);

// Increment skill
router.put('/incrementSkill/:subject/:skill', requireJwtAuth, controller.incrementSkill);

// Reset skill
router.put('/resetSkill/:subject/:skill', requireJwtAuth, controller.resetSkill);

// Delete skill
router.delete('/deleteSkill/:subject/:skill', requireJwtAuth, controller.deleteSkill);

module.exports = router;