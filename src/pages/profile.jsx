import { Button, Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/context/authContext';

export default function Profile() {
  const { user, logout } = useAuthContext();

  return (
    <Container mt={20}>
      <Text>Welcome</Text>
      <div>
        <Text>You are:</Text>
        <Text>id: {user?.id}</Text>
        <Text>Username: {user?.userName}</Text>
        <Text>Name Surname: {user?.nameSurname}</Text>
      </div>

      <Button
        mt={20}
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </Container>
  );
}
