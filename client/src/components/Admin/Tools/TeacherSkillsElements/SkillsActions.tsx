import { Button } from '../../../ui';

const SkillsActions = (
  {
    subject,
    skillName,
    handleCreateSkill,
    handleIncrementSkill,
    handleDeleteSkill,
    handleResetSkill,
  }) => {

  return (
    <>
      <Button onClick={() => handleIncrementSkill({ subject, skillName })}>Incrémenter une compétence</Button>
      <Button onClick={() => handleCreateSkill({ subject, skillName })}>Créer une compétence</Button>
      <Button onClick={() => handleDeleteSkill({ subject, skillName })}>Supprimer une compétence</Button>
      <Button onClick={() => handleResetSkill({ subject, skillName })}>Réinitialiser une compétence</Button>
    </>
  );
};

export default SkillsActions;