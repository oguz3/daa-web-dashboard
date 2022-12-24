import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Box,
  Avatar,
  Text,
  UnstyledButton,
  Code,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '@components/Logo';
import Link from 'next/link';

const HEADER_HEIGHT = 72;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderRadius: 0,
    overflow: 'hidden',
    padding: '16px',
    border: 'none',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  profileCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCardText: {
    marginLeft: '8px',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },
}));

const links = [
  {
    link: '/dashboard',
    label: 'Dashboard',
  },
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/profile',
    label: 'Profile',
    type: 'user-card',
  },
];

const DashboardHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => {
    if (link.type === 'user-card') {
      return (
        <Link key={link.label} href={link.link}>
          <UnstyledButton className={classes.profileCard}>
            <Avatar color="green" radius="xl">
              E
            </Avatar>
            <Text className={classes.profileCardText}>Profile</Text>
          </UnstyledButton>
        </Link>
      );
    }

    return (
      <Link key={link.label} href={link.link} passHref>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: active === link.link,
          })}
          onClick={() => {
            setActive(link.link);
            close();
          }}
        >
          {link.label}
        </a>
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Logo width={80} height={52} />
        <Group spacing={24} className={classes.links}>
          {items}
          <Code sx={{ fontWeight: 700 }}>v1.0.2</Code>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default DashboardHeader;
