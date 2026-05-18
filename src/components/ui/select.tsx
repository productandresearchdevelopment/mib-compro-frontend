'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function isReactElementWithChildren(
	child: React.ReactNode
): child is React.ReactElement<{ children?: React.ReactNode }> {
	return React.isValidElement<{ children?: React.ReactNode }>(child);
}

function extractText(node: React.ReactNode): string {
	if (typeof node === 'string' || typeof node === 'number') return String(node);
	if (Array.isArray(node)) return node.map(extractText).join(' ');
	if (isReactElementWithChildren(node)) {
		return extractText(node.props.children);
	}
	return '';
}

function useDebounce<T>(value: T, delay = 300): T {
	const [debounced, setDebounced] = React.useState(value);
	React.useEffect(() => {
		const handler = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debounced;
}

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot='select' {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot='select-group' {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot='select-value' {...props} />;
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'default';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot='select-trigger'
			data-size={size}
			className={cn(
				"border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className='size-4 opacity-50' />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = 'popper',
	searchable = false,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
	searchable?: boolean;
}) {
	const [search, setSearch] = React.useState('');
	const debouncedSearch = useDebounce(search, 300);

	const filteredChildren = React.Children.toArray(children).filter((child) => {
		if (!searchable || !debouncedSearch) return true;
		if (isReactElementWithChildren(child)) {
			const text = extractText(child.props.children);
			return text.toLowerCase().includes(debouncedSearch.toLowerCase());
		}
		return true;
	});

	const hasResults = filteredChildren.length > 0;

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot='select-content'
				onKeyDownCapture={(e) => {
					if (searchable && e.key.length === 1) {
						e.stopPropagation();
					}
				}}
				onCloseAutoFocus={() => {
					if (searchable) setSearch('');
				}}
				className={cn(
					'bg-popover text-popover-foreground relative z-9001 min-w-72 overflow-hidden rounded-md border shadow-md max-h-72 flex flex-col',
					className
				)}
				position={position}
				{...props}
			>
				{searchable && (
					<div className='p-2 border-b'>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search...'
							className='w-full rounded-md border px-2 py-1 text-sm outline-none'
							autoFocus
						/>
					</div>
				)}

				<SelectPrimitive.Viewport className='p-1 overflow-y-auto max-h-60'>
					{hasResults ? (
						filteredChildren
					) : (
						<SelectItem value='no-results' disabled>
							No results found
						</SelectItem>
					)}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot='select-label'
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot='select-item'
			className={cn(
				"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className
			)}
			{...props}
		>
			<span className='absolute right-2 flex size-3.5 items-center justify-center'>
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className='size-4' />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot='select-separator'
			className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
}

// function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
// 	return (
// 		<SelectPrimitive.ScrollUpButton
// 			className={cn('flex cursor-default items-center justify-center py-1', className)}
// 			{...props}
// 		>
// 			<ChevronUpIcon className='size-4' />
// 		</SelectPrimitive.ScrollUpButton>
// 	);
// }

// function SelectScrollDownButton({
// 	className,
// 	...props
// }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
// 	return (
// 		<SelectPrimitive.ScrollDownButton
// 			className={cn('flex cursor-default items-center justify-center py-1', className)}
// 			{...props}
// 		>
// 			<ChevronDownIcon className='size-4' />
// 		</SelectPrimitive.ScrollDownButton>
// 	);
// }

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	// SelectScrollDownButton,
	// SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
