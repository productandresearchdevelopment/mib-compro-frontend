'use client';

import type React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

function ThemedToaster() {
	const { theme } = useTheme();
	return <Toaster theme={theme === 'dark' ? 'dark' : 'light'} position='bottom-right' closeButton />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='light'
			enableSystem={false}
			disableTransitionOnChange={false}
		>
			<QueryClientProvider client={queryClient}>
				{children}
				<ThemedToaster />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</NextThemesProvider>
	);
}
