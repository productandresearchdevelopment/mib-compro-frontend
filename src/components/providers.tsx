'use client';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster theme="light" position="bottom-right" closeButton />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
