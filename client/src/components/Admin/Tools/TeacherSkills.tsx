import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import useTeacherSkills from '~/hooks/useTeacherSkills';
import { Button,  Label, Input } from '../../ui';
import { TableSkillsComponent, PieComponent, SkillsActions } from './TeacherSkillsElements/index';

Chart.register(...registerables);

function TeacherSkills() {
  const [subject, setSubject] = useState('');
  const [skillName, setSkillName] = useState('');
  const [count, setCount] = useState(0);

  const {
    teacherSkillsListAll,
    createSkill,
    incrementSkill,
    resetSkill,
    deleteSkill } = useTeacherSkills({ subject, skillName, count });

  const handleCreateSkill = async (skillData) => {
    await createSkill(skillData);
    resetInput();
  };

  const handleIncrementSkill = async (skillData) => {
    await incrementSkill(skillData);
    resetInput();
  };

  const handleDeleteSkill = async (skillData) => {
    await deleteSkill(skillData);
    resetInput();
  };

  const handleResetSkill = async (skillData) => {
    await resetSkill(skillData);
    resetInput();
  };

  const resetInput = () => {
    setSubject('');
    setSkillName('');
  };
  const skillsBySubject = teacherSkillsListAll?.reduce((acc, skill) => {
    if (!acc[skill.subject]) {
      acc[skill.subject] = [];
    }
    acc[skill.subject].push(skill);
    return acc;
  }, {});

  const subjects = [...new Set(teacherSkillsListAll?.map(skill => skill.subject))];

  const slicedPies = subjects.map((subject) => {
    const skillsOfSubject = teacherSkillsListAll?.filter(skill => skill.subject === subject);

    return {
      subject: subject,
      skills: skillsOfSubject || [],
    };
  });

  return (
    <div className='conntainer p-5'>
      <h3><Label>Liste des competences</Label></h3>
      {skillsBySubject && Object.entries(skillsBySubject).map(([subject, skills], index) => (
        <TableSkillsComponent key={index} subject={subject} skills={skills} />
      ))}
      <div className='flex flex-wrap justify-start'>
        {slicedPies.map((pieData, index) => (
          <PieComponent key={index} subject={pieData.subject} skills={pieData.skills} />
        ))}
      </div>
      <div className='mb-2'>
        <div className='w-1/4 mb-5'>
          <h3><Label>Action a effectuer</Label></h3>
          <Input className='w-full' value={subject} onChange={e => setSubject(e.target.value)} placeholder="cours"/>
          <Input className='w-full' value={skillName} onChange={e => setSkillName(e.target.value)} placeholder="competence" />
        </div>
        <div className='flex space-x-2 mb-5'>
          <SkillsActions
            subject={subject}
            skillName={skillName}
            handleCreateSkill={handleCreateSkill}
            handleIncrementSkill={handleIncrementSkill}
            handleDeleteSkill={handleDeleteSkill}
            handleResetSkill={handleResetSkill}
          />
        </div>
      </div>
    </div>
  );
}

export default TeacherSkills;