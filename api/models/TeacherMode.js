const teacher = {
  teacherMode: process.env.TEACHERMODE,
  teacherPromptEnable: process.env.TEACHER_PROMPT_ENABLED,
  teacherPrompt: process.env.TEACHER_PROMPT,
  teacherSubjects: process.env.TEACHER_SUBJECTS,
};

function isTeacherMode() {
  return teacher.teacherMode;
}

function isTeacherPromptEnable() {
  return teacher.teacherPromptEnable;
}

async function addTeacherPrompt(prompt) {
  return prompt + teacher.teacherPrompt;
}

async function teacherSubjects() {
  return teacher.teacherSubjects;
}

module.exports = {
  isTeacherMode,
  isTeacherPromptEnable,
  addTeacherPrompt,
  teacherSubjects,
};
