import React from 'react';
import cn from 'classnames';

import Sidebar from '@components/Sidebar';

import { useLayoutStore } from '@store/layoutStore';

import styles from './BuilderLayout.module.scss';
import { Box, Button, Drawer, Text, Title } from '@mantine/core';
import ClockSidebar from '@components/ElementSidebar/ClockSidebar';

function BuilderLayout({
  builder = false,
  sidebar = true,
  children,
  layoutClassName,
  contentClassName,
}) {
  const drawerStatus = useLayoutStore((state) => state.drawer);
  const resetDrawer = useLayoutStore((state) => state.resetDrawer);

  const deleteElement = useLayoutStore((state) => state.deleteElement);

  const handleDeleteElement = (name) => {
    deleteElement(name);
    resetDrawer();
  };

  return (
    <div
      className={cn(
        styles.layout,
        builder && styles.builderLayout,
        layoutClassName,
      )}
    >
      {sidebar && <Sidebar />}
      <div className={cn(styles.content, contentClassName)}>{children}</div>

      <Drawer
        size={280}
        position="right"
        withOverlay={true}
        overlayOpacity={0.5}
        overlayBlur={0.5}
        zIndex={10000}
        opened={drawerStatus.open}
        withCloseButton={false}
        onClose={() => {
          resetDrawer();
        }}
        title={
          <Box px="md" pt="md">
            <Title order={4} style={{ textTransform: 'capitalize' }}>
              {drawerStatus.elementName}
            </Title>
            <Text size="xs" style={{ textTransform: 'capitalize' }}>
              {drawerStatus.elementName} element settings will be here
            </Text>
          </Box>
        }
      >
        {drawerStatus.elementName === 'clock' && <ClockSidebar />}

        <Box
          px="md"
          py="md"
          pos="fixed"
          bottom="0px"
          left="0px"
          right="0px"
          style={{ borderTop: '1px solid #e3e3e3' }}
        >
          <Button
            size="xs"
            w="100%"
            type="button"
            variant="filled"
            color="red"
            onClick={() => handleDeleteElement(drawerStatus.elementName)}
          >
            Delete Element
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}

export default BuilderLayout;
