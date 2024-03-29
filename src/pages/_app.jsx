import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { RouterTransition } from '@components/RouterTransition';

import { AuthProvider } from '@context/authContext';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Inter, sans-serif',
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider position="top-right">
          <RouterTransition />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
