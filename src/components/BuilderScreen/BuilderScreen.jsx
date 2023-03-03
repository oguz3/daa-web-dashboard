import React from 'react';
import { Box, Button, createStyles, Text, Title } from '@mantine/core';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { DropTarget } from './dropable';
import { DraggableComponent } from './draggable';
import { useLayoutStore } from 'src/context/layoutStore';

const useStyles = createStyles((theme, _params) => {
  return {
    builder: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
    },

    content: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttons: {
      position: 'absolute',
      top: 20,
      right: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    mirrorWrapper: {
      width: '80%',
      height: 'auto',
      aspectRatio: '16/9',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 2fr 1fr',
      gap: '4px',
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[9],
    },

    mirrorCell: {
      width: '100%',
      height: '100%',
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
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

  const layout = useLayoutStore((state) => state.layout);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={classes.builder}>
        <Box className={classes.content}>
          <Box className={classes.buttons}>
            <Button
              variant="outline"
              color="blue"
              onClick={() => {
                console.log(layout);
              }}
            >
              Save
            </Button>
          </Box>
          <Title order={2} mb="16px" fw={700} fz="24px">
            Mirror Preview
          </Title>
          <Box className={classes.mirrorWrapper}>
            {!layout
              ? null
              : Object.keys(layout).map((key) => {
                  return (
                    <DropTarget
                      key={key}
                      positionKey={key}
                      elementName={layout[key]?.name}
                    />
                  );
                })}
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
            <DraggableComponent sidebar key={'clock'} name={'clock'} />

            <DraggableComponent sidebar key={'calendar'} name={'calendar'} />
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default BuilderScreen;
