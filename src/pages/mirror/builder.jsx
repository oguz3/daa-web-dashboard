import BuilderLayout from '@components/BuilderLayout';
import Head from 'next/head';

import BuilderScreen from '@components/BuilderScreen';

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
