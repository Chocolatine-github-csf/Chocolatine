import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, Label } from '../../../ui';
import { TSkill } from 'librechat-data-provider';

const TableSkillsComponent = ({ subject, skills }) => (
  <div>
    <h4><Label>{subject}</Label></h4>
    <Table className='w-3/4 border p-2 mb-5'>
      <TableHeader>
        <TableRow>
          <TableCell className='p-2 border'><Label>competence</Label></TableCell>
          <TableCell className='p-2 border'><Label>nombre de requetes</Label></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          (skills as TSkill[]).map((skill: TSkill, index: number) => (
            <TableRow key={index}>
              <TableCell className='p-2 border'><Label>{skill.skill}</Label></TableCell>
              <TableCell className='p-2 border'><Label>{skill.count}</Label></TableCell>
            </TableRow>
          ))
          ??
          <TableRow><TableCell>No skills</TableCell></TableRow>
        }
      </TableBody>
    </Table>
  </div>
);

export default TableSkillsComponent;