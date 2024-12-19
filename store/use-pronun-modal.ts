import { create } from "zustand";

interface PronunModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  onConfirm: (cb: () => void) => void;
  callback: (() => void) | null;
}

export const usePronunModal = create<PronunModalState>((set) => ({
  isOpen: false,
  callback: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, callback: null }),
  onConfirm: (cb) =>
    set((state) => {
      if (cb) {
        cb();
      }
      return {
        isOpen: false,
        callback: null,
      };
    }),
}));
