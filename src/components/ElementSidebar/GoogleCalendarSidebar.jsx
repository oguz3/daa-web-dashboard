import { Box, Group, Radio, Input } from '@mantine/core';
import { useLayoutStore } from '@store/layoutStore';
import { findElementInLayout } from '@utils/element';
import React from 'react';

const GoogleCalendarSidebar = () => {
  const layout = useLayoutStore((state) => state?.selectedMirror?.layout);

  const updateElement = useLayoutStore((state) => state.updateElement);

  const item = findElementInLayout(layout, 'google-calendar');

  const updateClockType = (event) => {
    updateElement(item?.name, { email: event.target.value });
  };

  return (
    <>
      <Box px="md" pt="sm" style={{ borderTop: '1px solid #e3e3e3' }}>
        <Input
          placeholder="Your email"
          size="sm"
          value={item?.attr?.email}
          onChange={updateClockType}
        />
      </Box>
    </>
  );
};

export default GoogleCalendarSidebar;
