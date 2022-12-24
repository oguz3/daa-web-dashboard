import { useEffect, useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  IconUsers,
  IconAdjustments,
  IconSettings,
  IconBrandTrello,
  IconLogout,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from '@components/Logo';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconBrandTrello },
  { link: '/mirror/builder', label: 'Builder', icon: IconAdjustments },
  { link: '/mirror/users', label: 'Users', icon: IconUsers },
  { link: '/settings', label: 'Other Settings', icon: IconSettings },
];

const Sidebar = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  useEffect(() => {
    const path = router.pathname;
    if (path) {
      setActive(path);
    }
  }, [router]);

  const links = data.map((item) => (
    <Link key={item.label} href={item.link} passHref>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.link === active,
        })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <Navbar height="100vh" width="100%" p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Logo width={80} height={52} />
          <Code sx={{ fontWeight: 700 }}>v1.0.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
