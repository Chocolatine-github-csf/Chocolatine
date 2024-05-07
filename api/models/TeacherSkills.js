const mongoose = require('mongoose');
const teacherSkillSchema = require('./schema/teacherSkillSchema');

const TeacherSkills = mongoose.model('TeacherSkill', teacherSkillSchema);
module.exports = TeacherSkills;