import Head from 'next/head';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import PreviewLite from '@components/PreviewLite';

export default function Builder() {
  const router = useRouter();
  const { id } = router.query;

  const [layout, setLayout] = useState(null);

  const createHubConnection = useCallback(async () => {
    if (!id) return;

    const hubCn = new HubConnectionBuilder()
      .withUrl('https://ensarkavak.fun/layouthub')
      .build();
    try {
      await hubCn.start();
      console.log(id);
      hubCn.invoke('SendLayoutId', id);

      hubCn.on('receiveLayout', (layout) => {
        setLayout(layout);
      });
    } catch (e) {
      console.log('e', e);
    }
  }, [id]);

  useEffect(() => {
    createHubConnection();
  }, [createHubConnection]);

  console.log(layout);

  return (
    <>
      <Head>
        <title>Builder | DAA</title>
      </Head>
      <PreviewLite
        layout={layout?.layout ? JSON.parse(layout?.layout) : undefined}
      />
    </>
  );
}
