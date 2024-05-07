import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Label } from '../../../ui';

interface PieComponentProps {
  subject: string;
  skills: { skill: string; count: number; }[];
}

const PieComponent: React.FC<PieComponentProps> = ({ subject, skills }) => {
  const sliceNames = skills.map(skill => skill.skill);
  const slicesCount = skills.map(skill => skill.count);

  const backgroundColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FFCD56',
    '#C9CBCF',
    '#36A2EB',
    '#FF6384',
  ];

  const borderColor = slicesCount.length === 1 ? backgroundColors[0] : 'grey';

  const data = {
    labels: sliceNames,
    datasets: [
      {
        data: slicesCount,
        backgroundColor: backgroundColors,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div key={subject} className="flex flex-col items-center space-y-4">
      <h3><Label>{subject}</Label></h3>
      <Pie data={data} />
    </div>
  );
};

export default PieComponent;