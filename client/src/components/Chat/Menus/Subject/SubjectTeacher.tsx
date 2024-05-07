import type { FC } from 'react';
import { cn } from '~/utils';
import { useContext } from 'react';
import { PresetTeacherContext } from '~/Providers/PresetTeacherContext';

const SubjectTeacher: FC = () =>{
  const context = useContext(PresetTeacherContext);

  if(!context)
  {
    throw new Error('usePresetTeacher must be used within a PresetTeacherProvider (*SubjectTeacher*)');
  }
  const { selectedPreset } = context;
  const title = selectedPreset?.title;

  return (
    <div
      className={cn(
        'pointer-cursor relative flex flex-col rounded-md border border-gray-100 bg-white text-left focus:outline-none focus:ring-0 focus:ring-offset-0 dark:border-gray-700 dark:bg-gray-800 sm:text-sm',
        'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-700',
        'z-50 flex h-[40px] min-w-4 flex-none items-center justify-center px-3 focus:ring-0 focus:ring-offset-0',
      )}>
      <span>{title ? 'Preset selectionne:' : '<--- Veuillez selectionner un professeur'}</span>
      <div className={cn('truncate')}>
        {title}
      </div>
    </div>
  );
};

export default SubjectTeacher;