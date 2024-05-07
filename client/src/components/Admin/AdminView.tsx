import { memo } from 'react';
import { Button, Label, ThemeSelector } from '../ui';
import { useNavigate } from 'react-router-dom';
import { TokenUsage , TeacherSkills } from '~/components/Admin/Tools';
import FeedBackTable from '~/components/Admin/FeedBackTable';
import CommentsTable from './CommentsTable';


const AdminView = () => {
  const navigate = useNavigate();
  const returnToChat = () => {
    navigate('/c/new');
  };


  return (
    <>
      <h1><Label>Admin View</Label></h1>
      <div>
        <Button  onClick={returnToChat}>
          Retourne au Chat
        </Button>
      </div>
      <TokenUsage/>
      <TeacherSkills/>
      <FeedBackTable />
      <CommentsTable />
      <ThemeSelector />
    </>
  );
};

export default memo(AdminView);