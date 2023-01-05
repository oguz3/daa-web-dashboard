import React from 'react';
import { Box, createStyles, Text, Title } from '@mantine/core';
import { IconCalendar, IconClockHour8 } from '@tabler/icons';

const useStyles = createStyles((theme, _params) => {
  return {
    builder: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
    },

    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },

    mirrorWrapper: {
      width: '80%',
      height: 'auto',
      aspectRatio: '16/9',
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[9],
    },

    mirror: {
      width: '100%',
      height: '100%',
      borderRadius: theme.radius.md,
      backgroundColor: 'white',
      display: 'grid',
      gridTemplateColumns: '0.35fr 1fr 0.35fr',
    },

    centerSide: {
      width: '100%',
      height: '100%',
      border: `1px dashed ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[6]
      }`,
      borderTop: 'none',
      borderBottom: 'none',
    },

    elementSidebar: {
      height: '100vh',
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      padding: theme.spacing.lg,
    },

    elementsWrapper: {
      marginTop: theme.spacing.md,
      paddingTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 91px)',
      gap: theme.spacing.md,
    },
    element: {
      width: '100%',
      aspectRatio: '1/1',
      borderRadius: theme.radius.md,
      border: `1px dashed ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[4]
      }`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
      cursor: 'pointer',
      transition: 'all 0.6s ease',
      '&:hover': {
        borderStyle: 'solid',
      },
    },
  };
});

const BuilderScreen = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.builder}>
      <Box className={classes.content}>
        <Title order={2} mb="16px" fw={700} fz="24px">
          Mirror Preview
        </Title>
        <Box className={classes.mirrorWrapper}>
          <Box className={classes.mirror}>
            <Box className={classes.leftSide}></Box>
            <Box className={classes.centerSide}></Box>
            <Box className={classes.rightSide}></Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.elementSidebar}>
        <Title fz="18px" fw={600} order={4}>
          Elements
        </Title>
        <Text fz="12px" mt="4px">
          Drag and drop elements from the sidebar to the mirror to see them in
        </Text>
        <Box className={classes.elementsWrapper}>
          <Box className={classes.element}>
            <IconClockHour8 />
            <Text fz="xs" mt="4px">
              Clock
            </Text>
          </Box>
          <Box className={classes.element}>
            <IconCalendar />
            <Text fz="xs" mt="4px">
              Calendar
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuilderScreen;
