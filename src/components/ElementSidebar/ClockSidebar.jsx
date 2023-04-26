import { Box, Group, Radio } from '@mantine/core';
import { useLayoutStore } from '@store/layoutStore';
import { findElementInLayout } from '@utils/element';
import React from 'react';

const ClockSidebar = () => {
  const layout = useLayoutStore((state) => state?.selectedMirror?.layout);

  const updateElement = useLayoutStore((state) => state.updateElement);

  const item = findElementInLayout(layout, 'clock');

  const updateClockType = (type) => {
    updateElement(item?.name, { type });
  };

  return (
    <>
      <Box px="md" pt="sm" style={{ borderTop: '1px solid #e3e3e3' }}>
        <Radio.Group
          name="type"
          label="Select your clock type"
          description="The appearance of the cloc"
          withAsterisk
          size="sm"
          value={item?.attr?.type}
          onChange={updateClockType}
        >
          <Group mt="xs">
            <Radio value="digital" label="Digital" />
            <Radio value="analog" label="Analog" />
          </Group>
        </Radio.Group>
      </Box>
    </>
  );
};

export default ClockSidebar;
