import { toast } from 'sonner';

export const showSuccessToast = (message: string, description?: string) => {
	toast.success(message, {
		description: description || 'Success',
	});
};

export const showInfoToast = (message: string, description?: string) => {
	toast.info(message, {
		description: description || 'Info',
	});
};

export const showWarningToast = (message: string, description?: string) => {
	toast.warning(message, {
		description: description || 'Warning',
	});
};

export const showLoadingToast = (message: string, description?: string) => {
	toast.loading(message, {
		description: description || 'Loading...',
	});
};

export const showErrorToast = (error: unknown, description?: string) => {
	let errorMessage = '';

	if (error instanceof Response) {
		errorMessage = `HTTP ${error.status} - ${error.statusText}`;
		error
			.json?.()
			.then((data) => {
				toast.error(data?.message || errorMessage, { description: description || 'Error' });
			})
			.catch(() => {
				toast.error(errorMessage, { description: description || 'Error' });
			});
		return;
	}

	if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		errorMessage = 'An unknown error occurred.';
	}

	toast.error(errorMessage, {
		description: description || 'Error',
	});
};
