import { create } from 'zustand';

type SidebarState = {
	isSidebarOpen: boolean;
	collapsed: boolean;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
	setCollapsed: (collapsed: boolean) => void;
	toggleCollapsed: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
	isSidebarOpen: false,
	collapsed: false,
	toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
	openSidebar: () => set({ isSidebarOpen: true }),
	closeSidebar: () => set({ isSidebarOpen: false }),
	setCollapsed: (collapsed) => set({ collapsed }),
	toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
