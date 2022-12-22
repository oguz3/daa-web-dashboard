import EmailInput from '@components/EmailInput';
import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

import styles from './RegisterForm.module.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Should be a valid email address.')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const RegisterForm = () => {
  const { register, setValue, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;

  const onSubmit = (data) => console.log(data);

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
            <EmailInput
              label="Email"
              placeholder="you@mantine.dev"
              onInputChange={(value) => {
                setValue(`email`, value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              error={errors?.email?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...register('password')}
              error={errors?.password?.message}
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
