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

import styles from './RegisterForm.module.scss';
import { useRegister } from '@hooks/useRegister';
import { showNotification } from '@mantine/notifications';

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  nameSurname: yup.string().required('Name & Surname is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = () => {
  const { createUser } = useRegister();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    createUser(data).then((res) => {
      showNotification({
        title: 'Success',
        message: "You've successfully registered",
      });

      router.push('/dashboard');
    });
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
          Register
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account?{' '}
          <Link href="/auth/login">
            <a className={styles.link}>Login</a>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Username"
              placeholder="Your username"
              autoComplete="username"
              {...register('userName')}
              error={errors?.userName?.message}
            />
            <TextInput
              label="Name & Surname"
              placeholder="Your name & surname"
              autoComplete="nameSurname"
              mt="md"
              {...register('nameSurname')}
              error={errors?.nameSurname?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              autoComplete="new-password"
              {...register('password')}
              error={errors?.password?.message}
            />
            <PasswordInput
              label="Password Confirmation"
              placeholder="Your password confirmation"
              mt="md"
              autoComplete="new-password"
              {...register('passwordConfirmation')}
              error={errors?.passwordConfirmation?.message}
            />

            <Button type="submit" fullWidth mt="xl">
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
