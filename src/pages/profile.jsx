import { useRouter } from 'next/router';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useLogout } from 'src/hooks/useLogout';

export default function Profile() {
  const { user: currentUser } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <div>
      <p>Welcome back</p>
      <div>You are: {currentUser?.username}</div>

      <button
        onClick={() => {
          logout();
          router.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
