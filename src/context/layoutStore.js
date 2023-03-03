import { layout } from 'src/data/dummy';
import { create } from 'zustand';

export const useLayoutStore = create((set) => ({
  layout: layout,
  updateLayout: (name, position) =>
    set((state) => {
      if (!name) return;
      const newLayoutData = JSON.parse(JSON.stringify(state.layout));
      Object.keys(newLayoutData).forEach((key) => {
        if (newLayoutData[key] && newLayoutData[key].name === name) {
          newLayoutData[key] = false;
        }
      });
      newLayoutData[position] = {
        name: name,
        style: 'default',
      };

      return { layout: newLayoutData };
    }),
}));
