import Cookies from 'js-cookie';
import fetch from '@utils/fetch';

export const useRegister = () => {
  const createUser = async (data) => {
    const user = await fetch(`/Users/CreateUser`, {
      method: 'POST',
      data: { ...data },
    });
    if (user) {
      Cookies.set('currentUser', JSON.stringify(user));
    }
    return user;
  };

  return { createUser };
};
