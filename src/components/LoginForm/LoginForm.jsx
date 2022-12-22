import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
  TextInput,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

import styles from './LoginForm.module.scss';
import { useLogin } from 'src/hooks/useLogin';

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const { login } = useLogin();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    login(data)
      .then((res) => router.push('/profile'))
      .catch((e) => console.error(e));
  };

  return (
    <Container mih="100vh" display="flex">
      <Box maw="420px" w="100%" m="auto">
        <Title
          align="center"
          sx={(theme) => ({
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href="/auth/register">
            <a className={styles.link}>Create account</a>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Username"
              placeholder="Your username"
              {...register('userName')}
              error={errors?.userName?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...register('password')}
              error={errors?.password?.message}
            />

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
