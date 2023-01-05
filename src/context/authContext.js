import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import fetch from '@utils/fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  createUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const createUser = async (data) => {
    const user = await fetch(`/Users/CreateUser`, {
      method: 'POST',
      data: { ...data },
    });

    return user;
  };

  const login = async (data) => {
    const user = await fetch(`/Users/Login`, {
      method: 'POST',
      data: { ...data },
    });

    const me = await fetch(`/Users/Me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token?.accessToken}`,
      },
    });

    if (user && me) {
      Cookies.set('user', JSON.stringify(user?.token));
      setUser(me);

      return user;
    } else {
      throw new Error('Login failed');
    }
  };

  const getMe = useCallback(async () => {
    const me = await fetch(`/Users/Me`, {
      method: 'GET',
    });

    if (me) {
      setUser(me);
    }

    return me;
  }, []);

  useEffect(() => {
    const user = Cookies.get('user');

    if (user) getMe();
  }, [getMe]);

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    router.push('auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, createUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
