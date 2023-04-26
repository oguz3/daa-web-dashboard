import React from 'react';
import { Box, createStyles } from '@mantine/core';

import { useLayoutStore } from '@store/layoutStore';
import getElement from '@elements/getElement';

const useStyles = createStyles((theme, _params) => {
  return {
    mirror: {
      width: '100vw',
      height: '100vh',
      padding: theme.spacing.md,
      backgroundColor: 'black',
    },

    mirrorWrapper: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 2fr 1fr',
      backgroundColor: 'black',
      overflow: 'hidden',
      color: 'white',
    },
  };
});

const PreviewLite = () => {
  const { classes, cx } = useStyles();

  const layout = useLayoutStore((state) => state?.selectedMirror?.layout);

  return (
    <Box className={classes.mirror}>
      <Box className={cx(classes.mirrorWrapper)}>
        {!layout
          ? null
          : Object.keys(layout).map((key) => {
              return (
                <div
                  key={key}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {layout[key] ? getElement(layout[key]) : null}
                </div>
              );
            })}
      </Box>
    </Box>
  );
};

export default PreviewLite;
