import React, { createContext, useState, FC } from 'react';
import type { TPreset } from 'librechat-data-provider';
import { useTeacherData } from '~/hooks/useTeacherData';

type PresetTeacherContextType = {
    selectedPreset: TPreset | undefined;
    setSelectedPreset: (value: TPreset) => void;
}

export const PresetTeacherContext = createContext<PresetTeacherContextType | undefined>(undefined);

export const PresetTeacherProvider : FC<{children: React.ReactNode}> = ({ children }) => {
  const isTeacher = useTeacherData().isTeacher;

  const [selectedPreset, setSelectedPreset] = useState<TPreset | undefined>();

  if(!isTeacher){
    return <>{children}</>;
  }
  return (
    <PresetTeacherContext.Provider value={{ selectedPreset, setSelectedPreset }}>
      {children}
    </PresetTeacherContext.Provider>
  );
};