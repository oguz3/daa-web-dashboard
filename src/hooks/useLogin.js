import Cookies from 'js-cookie';
import fetch from '@utils/fetch';

export const useLogin = () => {
  const login = async (data) => {
    const user = await fetch(`/Users/Login`, {
      method: 'POST',
      data: { ...data },
    });
    if (user) {
      Cookies.set('currentUser', JSON.stringify(user));
    }
    return user;
  };

  return { login };
};
