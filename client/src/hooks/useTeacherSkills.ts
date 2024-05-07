import { queryClient } from 'librechat-data-provider/react-query';
import {
  useGetAllSkills,
  useGetSkillsBySubject,
  useGetSkillsBySkill,
  useGetSkillsBySubjectAndSkill,
  useCreateSkill,
  useIncrementSkill,
  useResetSkill,
  useDeleteSkill,
} from 'librechat-data-provider/react-query';
import { TSkill } from 'librechat-data-provider';
import { useQueryClient } from '@tanstack/react-query';

interface SkillParams {
  subject?: string;
  skillName?: string;
  count?: number;
}

type SkillAction = (params: TSkill) => void;

export default function useTeacherSkills(params?: SkillParams):
{
  teacherSkillsListAll: TSkill[] | undefined,
  teacherSkillsListBySubject: TSkill[] | undefined,
  teacherSkillsListBySkill: TSkill[] | undefined,
  teacherSkillsListBySubjectAndSkill: TSkill[] | undefined,
  createSkill: SkillAction,
  incrementSkill: SkillAction,
  resetSkill: SkillAction,
  deleteSkill: SkillAction
}
{
  const parameters: TSkill = { subject: params?.subject ?? '', skill: params?.skillName ?? '', count: params?.count ?? 0 };
  const { data: teacherSkillsListAll } = useGetAllSkills();
  const { data: teacherSkillsListBySubject } = useGetSkillsBySubject(params?.subject || '');
  const { data: teacherSkillsListBySkill } = useGetSkillsBySkill(params?.skillName || '');
  const { data: teacherSkillsListBySubjectAndSkill } = useGetSkillsBySubjectAndSkill(params?.subject || '', params?.skillName || '');

  const queryClient = useQueryClient();

  const { mutate: createSkill } = useCreateSkill(parameters, queryClient);
  const { mutate: incrementSkill } = useIncrementSkill(parameters, queryClient);
  const { mutate: resetSkill } = useResetSkill(parameters, queryClient);
  const { mutate: deleteSkill } = useDeleteSkill(parameters, queryClient);

  return {
    teacherSkillsListAll,
    teacherSkillsListBySubject,
    teacherSkillsListBySkill,
    teacherSkillsListBySubjectAndSkill,
    createSkill,
    incrementSkill,
    resetSkill,
    deleteSkill,
  };
}