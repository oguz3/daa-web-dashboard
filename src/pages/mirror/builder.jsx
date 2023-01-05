import BuilderLayout from '@components/BuilderLayout';
import BuilderScreen from '@components/BuilderScreen';
import { Box } from '@mantine/core';
import Head from 'next/head';

export default function Builder() {
  return (
    <>
      <Head>
        <title>Builder | DAA</title>
      </Head>
      <BuilderLayout builder>
        <BuilderScreen />
      </BuilderLayout>
    </>
  );
}
