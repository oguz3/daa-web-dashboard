import BuilderLayout from '@components/BuilderLayout';
import Head from 'next/head';

import BuilderScreen from '@components/BuilderScreen';
import { useLayoutStore } from '../../../store/layoutStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Builder() {
  const router = useRouter();
  const { id } = router.query;

  const selectedMirror = useLayoutStore((state) => state.selectedMirror);

  useEffect(() => {
    if (!selectedMirror) {
      router.push('/dashboard');
    }
  }, [router, selectedMirror]);

  return (
    <>
      <Head>
        <title>Builder | DAA</title>
      </Head>
      <BuilderLayout builder>
        <BuilderScreen id={id} />
      </BuilderLayout>
    </>
  );
}
