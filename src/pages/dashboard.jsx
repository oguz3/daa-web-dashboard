import Head from 'next/head';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Grid,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import DashboardHeader from '@components/DashboardHeader';
import WelcomeBanner from '@components/WelcomeBanner';
import MirrorCard from '@components/MirrorCard';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardHeader />
      <WelcomeBanner />

      <Container mt="32px">
        <Title fz="20px" fw={600} ff="Inter, sans-serif">
          My Mirrors
        </Title>
        <Text mt="8px" fz="sm" c="#495057">
          You can edit your mirrors here. If you want to create a new mirror,
          you can do so by clicking the create button.
        </Text>

        <Divider mb="xl" mt="md" />

        <Grid>
          <Grid.Col span={4}>
            <MirrorCard
              image="https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              title="Home mirror"
              description="56 km this month • 17% improvement compared to last month • 443 place in global scoreboard"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
