import Head from 'next/head';

import { useLayoutStore } from '../../../store/layoutStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PreviewLite from '@components/PreviewLite';

export default function Builder() {
  const router = useRouter();
  const { id } = router.query;

  const selectedMirror = useLayoutStore((state) => state.selectedMirror);
  const getMirrorById = useLayoutStore((state) => state.getMirrorById);

  useEffect(() => {
    if (!id) return;
    if (!selectedMirror || selectedMirror.id !== id) {
      getMirrorById(id);
    }
  }, [router, selectedMirror, getMirrorById, id]);

  return (
    <>
      <Head>
        <title>Builder | DAA</title>
      </Head>
      <PreviewLite />
    </>
  );
}
