import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return { user };
};
