import Cookies from 'js-cookie';

export function getAuthorizationHeader() {
  const user = Cookies.get('user');

  return {
    Authorization: `Bearer ${JSON.parse(user || '')?.accessToken || ''}`,
  };
}
