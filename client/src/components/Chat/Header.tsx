import { useOutletContext } from 'react-router-dom';
import type { ContextType } from '~/common';
import { EndpointsMenu, PresetsMenu, HeaderNewChat, AdminMenu, SubjectMenu, PresetsTeacherMenu } from './Menus';
import HeaderOptions from './Input/HeaderOptions';
import { useTeacherData } from '~/hooks/useTeacherData';
import { useUserRole } from '~/hooks';

export default function Header() {
  const { navVisible } = useOutletContext<ContextType>();
  const isTeacher = useTeacherData().isTeacher;
  const role = useUserRole();
  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-white p-2 font-semibold dark:bg-gray-800 dark:text-white">
      <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto">
        {!navVisible && <HeaderNewChat />}
        {isTeacher && role === 'ADMIN' && (
          <>
            <EndpointsMenu />
            <HeaderOptions />
            {/* <PresetsMenu />
            <SubjectMenu /> */}
            <AdminMenu />
          </>
        )}
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
