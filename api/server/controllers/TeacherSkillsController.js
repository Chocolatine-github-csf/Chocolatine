const TeacherSkills = require('~/models/TeacherSkills');
const { logger } = require('~/config');

const teacherSkillsController = {
  getAllSkillsAndSubjects: async (req, res) => {
    try {
      const result = await TeacherSkills.find().lean();
      if (!result || result.length === 0) {
        return res.status(200).json({ message: 'No skills found' });
      }
      res.status(200).json(result);
    } catch (error) {
      logger.error('[getAllSkillsAndSubject] Error getting all skills and subjects', error);
      res.status(500).json({ message: 'Error getting all skills and subjects' });
    }
  },

  getSkillsBySubject: async (req, res) => {
    const { subject } = req.params;
    try {
      const result =  await TeacherSkills.find({ subject }).lean();
      if (!result || result.length === 0) {
        return res.status(200).json({ message: 'No skills found for this subject' });
      }
      res.status(200).json(result);
    } catch (error) {
      logger.error('[getSkillsBySubject] Error getting skills by subject', error);
      res.status(500).json({ message: 'Error getting skills by subject' });
    }
  },

  getSkillsBySkill: async (req, res) => {
    const { skill } = req.params;
    try {
      const result = await TeacherSkills.find({ skill } ).lean();
      if (!result || result.length === 0) {
        return res.status(200).json({ message: 'No skills found for this skill' });
      }
      res.status(200).json(result);

    } catch (error) {
      logger.error('[getSkillsBySkill] Error getting skills by skill', error);
      res.status(500).json({ message: 'Error getting skills by skill' });
    }
  },

  getSkillsBySubjectAndSkill: async (req, res) => {
    const { subject, skill } = req.params;
    try {
      const result = await TeacherSkills.find({ subject, skill }).lean();
      if (!result || result.length === 0) {
        return res.status(200).json({ message: 'No skills found for this subject and skill' });
      }
      res.status(200).json(result);
    } catch (error) {
      logger.error('[getSkillsBySubjectAndSkill] Error getting skills by subject and skill', error);
      res.status(500).json({ message: 'Error getting skills by subject and skill' });
    }
  },

  createSkill: async (req, res) => {
    const { subject, skill } = req.body;
    try {
      const skillAlreadyExist = await TeacherSkills.findOne({ subject, skill });
      if(skillAlreadyExist){
        logger.error('[createSkill] Skill already exist');
        res.status(400).json({ message: 'Skill already exist' });
      }
      else{
        const newSkill = new TeacherSkills({ subject, skill });
        await newSkill.save();
        res.status(201).json({ message: 'Skill created successfully' });
      }
    } catch (error) {
      logger.error('[createSkill] Error saving skill', error);
      res.status(500).json({ message: 'Error creating skill' });
    }
  },

  incrementSkill: async (req, res) => {
    const { subject, skill } = req.params;
    try {
      const skillToUpdate = await TeacherSkills.findOne({ subject, skill });
      if (!skillToUpdate) {
        return res.status(200).json({ message: 'No skills found' });
      }
      await TeacherSkills.updateOne({ subject, skill }, { $inc: { count: 1 } });
      res.status(201).json({ message: 'Skill incremented successfully' });
    } catch (error) {
      logger.error('[incrementSkill] Error incrementing skill', error);
      res.status(500).json({ message: 'Error incrementing skill' });
    }
  },

  resetSkill: async (req, res) => {
    const { subject, skill } = req.params;
    try {
      const skillToUpdate = await TeacherSkills.findOne({ subject, skill });
      if (!skillToUpdate) {
        return res.status(200).json({ message: 'No skills found for this subject' });
      }
      await TeacherSkills.updateOne({ subject, skill }, { $set: { count: 0 } });
      res.status(201).json({ message: 'Skill reset successfully' });
    }
    catch (error) {
      logger.error('[resetSkill] Error resetting skill', error);
      res.status(500).json({ message: 'Error resetting skill' });
    }
  },

  deleteSkill: async (req, res) => {
    const { subject, skill } = req.params;
    try{
      const skillToDelete = await TeacherSkills.findOne({ subject, skill });
      if(skillToDelete){
        await TeacherSkills.deleteOne({ subject, skill });
        res.status(200).json({ message: 'Skill deleted successfully' });
      }
      else{
        logger.error('[deleteSkill] Skill not found');
        res.status(404).json({ message: 'Skill not found' });
      }
    }
    catch (error) {
      logger.error('[deleteSkill] Error deleting skill', error);
      res.status(500).json({ message: 'Error deleting skill' });
    }
  },
};

module.exports = teacherSkillsController;