const mongoose = require('mongoose');

const teacherSkillSchema = mongoose.Schema({
  subject:{
    type: String,
    required: true,
  },
  skill:{
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = teacherSkillSchema;