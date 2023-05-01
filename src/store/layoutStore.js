import { layout } from 'src/data/dummy';
import { create } from 'zustand';
import fetch from '@utils/fetch';
import { ElementInitialValue } from '@constants/ElementInitialValue';

export const useLayoutStore = create((set, get) => ({
  mirrors: [],
  selectedMirror: null,
  showGrid: true,
  drawer: {
    open: false,
    elementName: null,
  },
  openDrawer: (elementName) => {
    set({
      drawer: {
        open: true,
        elementName,
      },
    });
  },
  resetDrawer: () => {
    set({
      drawer: {
        open: false,
        elementName: null,
      },
    });
  },
  updateGrid: (showGrid) => set({ showGrid: showGrid }),
  updateLayout: (name, position) => {
    if (!name) return;

    let element = ElementInitialValue[name];
    if (!element) return;

    set((state) => {
      if (!state.selectedMirror.layout) return;

      const newLayoutData = JSON.parse(
        JSON.stringify(state.selectedMirror.layout),
      );
      Object.keys(newLayoutData).forEach((key) => {
        if (newLayoutData[key] && newLayoutData[key].name === name) {
          element = newLayoutData[key];
          newLayoutData[key] = false;
        }
      });
      newLayoutData[position] = element;

      return {
        selectedMirror: { ...state.selectedMirror, layout: newLayoutData },
      };
    });
  },
  updateElement: (name, attr) => {
    if (!name) return;

    set((state) => {
      if (!state.selectedMirror.layout) return;

      const newLayoutData = JSON.parse(
        JSON.stringify(state.selectedMirror.layout),
      );
      Object.keys(newLayoutData).forEach((key) => {
        if (newLayoutData[key] && newLayoutData[key].name === name) {
          newLayoutData[key] = {
            ...newLayoutData[key],
            attr: { ...newLayoutData[key]?.attr, ...attr },
          };
        }
      });

      return {
        selectedMirror: { ...state.selectedMirror, layout: newLayoutData },
      };
    });
  },
  deleteElement: (name) => {
    if (!name) return;

    set((state) => {
      if (!state.selectedMirror.layout) return;

      const newLayoutData = JSON.parse(
        JSON.stringify(state.selectedMirror.layout),
      );

      Object.keys(newLayoutData).forEach((key) => {
        if (newLayoutData[key] && newLayoutData[key].name === name) {
          newLayoutData[key] = false;
        }
      });

      return {
        selectedMirror: { ...state.selectedMirror, layout: newLayoutData },
      };
    });
  },
  getAllMirrors: async () => {
    const data = await fetch(`/Mirrors`, {
      method: 'GET',
      data: { ...data },
    });
    set({ mirrors: data.layouts });
  },
  getMirrorById: async (id) => {
    const data = await fetch(`/Mirrors/${id}`, {
      method: 'GET',
    });

    set({
      selectedMirror: {
        layout: JSON.parse(data.layout.layout),
        layoutName: data.layout.layoutName,
        id: data.layout.id,
      },
    });
  },
  createMirror: async () => {
    const mirrors = get()?.mirrors;
    const response = await fetch(`/Mirrors`, {
      method: 'POST',
      data: {
        layout: JSON.stringify(layout),
        layoutName: `My Mirror ${(mirrors?.length || 0) + 1}`,
      },
    });

    set({
      mirrors: [...mirrors, response.layout],
    });
  },
  deleteMirror: async (id) => {
    const getAllMirrors = get()?.getAllMirrors;

    await fetch(`/Mirrors/${id}`, {
      method: 'DELETE',
    });

    getAllMirrors();
  },
  saveMirror: async () => {
    const selected = get().selectedMirror;
    await fetch(`/Mirrors`, {
      method: 'PUT',
      data: {
        layout: JSON.stringify(selected.layout),
        layoutName: selected.layoutName,
        layoutId: selected.id,
      },
    });
  },
}));
