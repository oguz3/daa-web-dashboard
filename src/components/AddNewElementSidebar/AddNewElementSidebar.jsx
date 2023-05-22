import React from 'react';
import { Box, createStyles, Text, Title } from '@mantine/core';

import DraggableComponent from '@components/DraggableComponent';

const useStyles = createStyles((theme, _params) => {
  return {
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
  };
});

const AddNewElementSidebar = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.elementSidebar}>
      <Title fz="18px" fw={600} order={4}>
        Elements
      </Title>
      <Text fz="12px" mt="4px">
        Drag and drop elements from the sidebar to the mirror to see them in
      </Text>
      <Box className={classes.elementsWrapper}>
        <DraggableComponent sidebar key={'clock'} name={'clock'} />
        <DraggableComponent sidebar key={'calendar'} name={'calendar'} />
        <DraggableComponent sidebar key={'weather'} name={'weather'} />
        <DraggableComponent
          sidebar
          key={'weatgoogle-calendarher'}
          name={'google-calendar'}
        />
      </Box>
    </Box>
  );
};

export default AddNewElementSidebar;
