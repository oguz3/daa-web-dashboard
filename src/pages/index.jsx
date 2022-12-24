import Head from 'next/head';

import { Anchor, Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>

      <Link href="/dashboard">
        <Button ml="md">Dashboard</Button>
      </Link>
    </>
  );
}
