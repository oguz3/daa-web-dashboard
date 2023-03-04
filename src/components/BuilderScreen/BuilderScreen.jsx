import React from 'react';
import { Box, Button, createStyles, Title } from '@mantine/core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import dynamic from 'next/dynamic';

import AddNewElementSidebar from '@components/AddNewElementSidebar';

import { useLayoutStore } from '@store/layoutStore';

const Preview = dynamic(() => import('@components/Preview'), {
  ssr: false,
});

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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
  };
});

const BuilderScreen = () => {
  const { classes } = useStyles();

  const layout = useLayoutStore((state) => state.layout);

  const showGrid = useLayoutStore((state) => state.showGrid);
  const updateGrid = useLayoutStore((state) => state.updateGrid);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={classes.builder}>
        <Box className={classes.content}>
          <Box className={classes.buttons}>
            <Button
              variant="outline"
              color="dark"
              onClick={() => {
                updateGrid(!showGrid);
              }}
            >
              {showGrid ? 'Hide Grid' : 'Show Grid'}
            </Button>
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
          <Preview />
        </Box>

        <AddNewElementSidebar />
      </Box>
    </DndProvider>
  );
};

export default BuilderScreen;
