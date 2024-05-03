import React, { useState, useEffect } from 'react';
import useTeacherSkills from '~/hooks/useTeacherSkills';
import { Button, Table, TableHeader, TableBody, TableRow, TableCell, Label, Input } from '../../ui';
import { TSkill } from 'librechat-data-provider';

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

  const handleCreateSkill = async () => {
    await createSkill({ subject, skill: skillName });
    resetInput();
  };

  const handleIncrementSkill = async () => {
    await incrementSkill({ subject, skill: skillName });
    resetInput();
  };

  const handleDeleteSkill = async () => {
    await deleteSkill({ subject, skill: skillName });
    resetInput();
  };

  const handleResetSkill = async () => {
    await resetSkill({ subject, skill: skillName });
    resetInput();
  };

  const resetInput = () => {
    setSubject('');
    setSkillName('');
  };

  return (
    <div className='conntainer p-5'>
      <h3><Label>Liste des competences</Label></h3>
      <Table className='w-3/4 border p-2 mb-5'>
        <TableHeader>
          <TableRow>
            <TableCell className='w-1/3 p-2 border'><Label>cours</Label></TableCell>
            <TableCell className='p-2 border'><Label>competence</Label></TableCell>
            <TableCell className='p-2 border'><Label>nombre de requetes</Label></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherSkillsListAll?.map((teacherSkill: TSkill, index: number) => (
            <TableRow key={index}>
              <TableCell className='w-1/3 p-2 border'><Label>{teacherSkill.subject}</Label></TableCell>
              <TableCell className='p-2 border'><Label>{teacherSkill.skill }</Label></TableCell>
              <TableCell className='p-2 border'><Label>{teacherSkill.count}</Label></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='w-1/4 mb-5'>
        <h3><Label>Action a effectuer</Label></h3>
        <Input className='w-full' value={subject} onChange={e => setSubject(e.target.value)} placeholder="cours"/>
        <Input className='w-full' value={skillName} onChange={e => setSkillName(e.target.value)} placeholder="competence" />
      </div>
      <div className='flex space-x-2 mb-5'>
        <Button onClick={handleIncrementSkill}>Incrémenter une compétence</Button>
        <Button onClick={handleCreateSkill}>Créer une compétence</Button>
        <Button onClick={handleDeleteSkill}>Supprimer une compétence</Button>
        <Button onClick={handleResetSkill}>Réinitialiser une compétence</Button>
      </div>
    </div>
  );
}

export default TeacherSkills;