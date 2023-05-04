import { IconCalendar, IconClockHour8, IconCloud } from '@tabler/icons';
import { Box, createStyles, Text } from '@mantine/core';
import { useDrag } from 'react-dnd';

import { useLayoutStore } from '@store/layoutStore';

const useStyles = createStyles((theme, _params) => {
  return {
    element: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },

    elementSidebarStyle: {
      aspectRatio: '1/1',
      borderRadius: theme.radius.md,
      border: `1px dashed ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[4]
      }`,
      padding: theme.spacing.md,
      transition: 'all 0.6s ease',
      '&:hover': {
        borderStyle: 'solid',
      },
    },
  };
});

const IconKey = {
  calendar: IconCalendar,
  clock: IconClockHour8,
  weather: IconCloud,
};

const DraggableComponent = ({ sidebar, name }) => {
  const { classes, cx } = useStyles();

  const updateLayout = useLayoutStore((state) => state.updateLayout);

  const [collected, drag] = useDrag(() => ({
    type: 'element',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        updateLayout(item.name, dropResult.position);
      }
    },
  }));

  const Icon = IconKey[name];

  return (
    <Box
      className={cx(classes.element, {
        [classes.elementSidebarStyle]: sidebar,
      })}
      ref={drag}
      {...collected}
    >
      <Icon />
      <Text fz="xs" mt="4px">
        {name}
      </Text>
    </Box>
  );
};

export default DraggableComponent;
