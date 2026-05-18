'use client';

import { useMounted } from '@/hooks/useMounted';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
	const isMounted = useMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<div className='min-h-screen bg-white flex items-center justify-center p-4 md:p-6 lg:p-8 relative overflow-hidden'>
			<div className='w-full flex flex-col lg:block'>
				<div className='block lg:hidden mb-12 mx-auto'>
					<Image
						src='/images/logo.png'
						alt='Mini ERP'
						width={180}
						height={32}
						className='object-contain w-auto h-10 md:h-12 lg:h-14'
						priority
					/>
				</div>
				<div className='w-full max-w-md mx-auto mb-8 lg:mb-0 lg:absolute lg:right-32 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 lg:max-w-3xl lg:mx-0'>
					<Image
						src='/images/404.png'
						alt='404 Error Illustration'
						width={900}
						height={900}
						className='w-full h-auto object-contain'
						priority
					/>
				</div>

				<div className='relative z-10 w-full max-w-7xl mx-auto'>
					<div className='flex flex-col items-center text-center lg:text-left lg:items-start space-y-4 md:space-y-6 lg:max-w-xl'>
						<div className='hidden lg:block mb-8 md:mb-12 lg:mb-16'>
							<Image
								src='/images/logo.png'
								alt='Mini ERP'
								width={180}
								height={32}
								className='object-contain w-auto h-10 md:h-12 lg:h-14'
								priority
							/>
						</div>

						<div>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-2'>Ooops...</h1>
							<p className='text-2xl md:text-3xl lg:text-4xl text-slate-700'>Page not found</p>
						</div>

						<p className='text-slate-600 text-sm md:text-base leading-relaxed max-w-[520px]'>
							The page you are looking for might have been removed had its name changed or is temporarily
							unavailable.
						</p>

						<Link
							href='/'
							className='inline-block mt-4 md:mt-6 px-6 md:px-8 py-2.5 md:py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm md:text-base'
						>
							Back to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
