import { create } from "zustand";

interface PermissionState {
  allowedPaths: string[];
  allModulePaths: string[];
  setAllowedPaths: (paths: string[]) => void;
  setAllModulePaths: (paths: string[]) => void;
  reset: () => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  allowedPaths: [],
  allModulePaths: [],
  setAllowedPaths: (paths) => set({ allowedPaths: paths }),
  setAllModulePaths: (paths) => set({ allModulePaths: paths }),
  reset: () => set({ allowedPaths: [], allModulePaths: [] }),
}));
