import { useEffect, useState } from 'react';
import { useGetUserRole } from 'librechat-data-provider/react-query';



export default function useUserRole(): string | null {
  const userRole = useGetUserRole();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (userRole.data) {
      setRole(userRole.data.role);
    }
  }, [userRole.data]);

  return role;
};

