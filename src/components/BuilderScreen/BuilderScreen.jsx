import React from 'react';
import { Box, Button, createStyles, Drawer, Title } from '@mantine/core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import dynamic from 'next/dynamic';

import AddNewElementSidebar from '@components/AddNewElementSidebar';

import { useLayoutStore } from '@store/layoutStore';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

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

const BuilderScreen = ({ id }) => {
  const router = useRouter();
  const { classes } = useStyles();

  const showGrid = useLayoutStore((state) => state.showGrid);
  const updateGrid = useLayoutStore((state) => state.updateGrid);
  const layout = useLayoutStore((state) => state?.selectedMirror?.layout);
  const isFadeTextVisible = layout?.fadeText ? true : false;

  const saveMirror = useLayoutStore((state) => state.saveMirror);
  const toggleFadeText = useLayoutStore((state) => state.toggleFadeText);

  const handleSave = () => {
    saveMirror()
      .then(() => {
        showNotification({
          title: 'Başarılı',
          message: 'Ayna başarıyla kaydedildi',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Hata',
          message: 'Bir hata oluştu',
        });
      });
  };

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
              color="dark"
              onClick={() => {
                toggleFadeText();
              }}
            >
              {isFadeTextVisible ? 'Hide Bottom Text' : 'Show Bottom Text'}
            </Button>
            <Button
              variant="outline"
              color="blue"
              disabled={!id}
              onClick={() => {
                if (!id) return;
                router.push(`/mirror/${id}/preview`);
              }}
            >
              Preview
            </Button>
            <Button color="blue" onClick={handleSave}>
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
