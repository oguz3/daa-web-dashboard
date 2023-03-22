import { layout } from 'src/data/dummy';
import { create } from 'zustand';
import fetch from '@utils/fetch';

export const useLayoutStore = create((set, get) => ({
  mirrors: [],
  selectedMirror: null,
  showGrid: true,
  updateLayout: (name, position) =>
    set((state) => {
      if (!name) return;
      if (!state.selectedMirror.layout) return;
      const newLayoutData = JSON.parse(
        JSON.stringify(state.selectedMirror.layout),
      );
      Object.keys(newLayoutData).forEach((key) => {
        if (newLayoutData[key] && newLayoutData[key].name === name) {
          newLayoutData[key] = false;
        }
      });
      newLayoutData[position] = {
        name: name,
        style: 'default',
      };

      return {
        selectedMirror: { ...state.selectedMirror, layout: newLayoutData },
      };
    }),

  updateGrid: (showGrid) => set({ showGrid: showGrid }),
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
    const response = await fetch(`/Mirrors`, {
      method: 'PUT',
      data: {
        layout: JSON.stringify(selected.layout),
        layoutName: selected.layoutName,
        layoutId: selected.id,
      },
    });
  },
}));
